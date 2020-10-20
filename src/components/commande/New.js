import React from 'react';
import {Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';
import date from '../helpers/date';
import Print from '../commande/print';

class commandeNew extends React.Component{
    state = { 
              redirect          : null,
              print             : false,
              categories        : [],
              messageCategories : '',
              articles          : [],
              articlesByCategory: [],
              commande          : {id:null, lignes: [], user: null, date: null, total: 0, caisse:false, annulee: false },
              user              : JSON.parse(localStorage.getItem('user')),
              settings          : {},
              messages          : {article: ''},
              message           : '',
              saved             : false ,
              loading           : false
            };

    componentDidMount(){
        if(!localStorage.getItem('categories')) 
            this.categoriesRefresh();
        else
            this.setState({ categories: JSON.parse(localStorage.getItem('categories')) });

        if(!localStorage.getItem('articles')) 
            this.articlesRefresh();
        else
            this.setState({ articles: JSON.parse(localStorage.getItem('articles')) });
        
        if(!localStorage.getItem('settings')) 
            this.settingsRefresh();
        else
            this.setState({ settings: JSON.parse(localStorage.getItem('settings')) });
        
        this.onCategorySelect(1)
    }

    refresh = () =>{
        this.settingsRefresh();
        this.categoriesRefresh();
        this.articlesRefresh();
    }

    settingsRefresh = () =>{
        this.setState({loading:true});
        this.setState({settings:[]});
        api.get('/settings/1')
        .then(res => {
            const settings = res.data;
            this.setState({ settings });
            localStorage.setItem('settings',JSON.stringify(settings)) ;
            this.setState({loading: false});
        });
    }

    categoriesRefresh = () =>{
        this.setState({loading:true});
        this.setState({categories:[]});
        this.setState({messageCategories : <div className="alert alert-warning"><small>Chargement cours..</small></div>});
        api.get('/categories')
            .then(res => {
                const categories = res.data;
                this.setState({ categories });
                this.setState({messageCategories : ''}); 
                localStorage.setItem('categories',JSON.stringify(categories));
                this.onCategorySelect(1);
                this.setState({loading: false});                
        }, err=>{
            this.setState({messageCategories : <div className="alert alert-danger"><small>Erreur lors de chargement.</small></div>});
        })
         
    }
 
    articlesRefresh = () =>{
        this.setState({loading:true});
        this.setState({articles:[]});
        api.get('/articles')
            .then(res => {
                const articles = res.data;
                this.setState({ articles });
                localStorage.setItem('articles',JSON.stringify(articles));
                this.setState({loading: false});
        }) 
    }
    

    onCategorySelect = (id) => {
        let articlesByCategory = this.state.articles.filter(function(article){
            return article.category.id == id
        });
        this.setState({articlesByCategory});
    }
     

    onArticleSelect = (id, intitule, prix ) => {
        let ligne        = {};
        ligne.article    = {id: id, intitule: intitule};
        ligne.prix       = parseFloat(prix).toFixed(2);
        ligne.quantite   = 1;

        let montant      = parseFloat((prix * 1)).toFixed(2);
        ligne.montant    = montant;

        let commande = this.state.commande;
        commande.total = (parseFloat(commande.total) + parseFloat(montant)).toFixed(2);

        commande.lignes.push(ligne);
        this.setState({commande});

    }

    onLigneQteUpdate(index,value){

        let commande = this.state.commande;
        if(commande.lignes[index].quantite+ parseInt(value) === 0)
            return false;

        commande.lignes[index].quantite = parseInt(commande.lignes[index].quantite) + parseInt(value);
        commande.lignes[index].montant  = (parseFloat(commande.lignes[index].prix) * parseFloat(commande.lignes[index].quantite)).toFixed(2);
        commande.total = (commande.lignes.reduce((a, b) => parseFloat(a) + parseFloat(b.montant), 0)).toFixed(2);
        this.setState({commande});
    }

    onArticleDelete = (index) => {
        let commande = this.state.commande;
        commande.total = commande.total - commande.lignes[index].montant;
        commande.lignes.splice(index,1);
        this.setState({commande});
    }

    onCommandeNew = () => {
        let commande   = { lignes: [], total: 0 };
        this.setState({commande});
        this.setState({message: ''});
        this.setState({saved: false});
    }

    onCommandePost = (event) => {
        event.preventDefault();
        
        if(this.state.saved)
            return false;
         
        window.print();    
        api.post('/commandes',{user:'/api/users/' + this.state.user.id, date: date(), caisse: false, annulee: false}).then(
            res => {
                if(res.data.id){
                    let commandes = [];
                    if(localStorage.getItem('commandes'))
                        commandes = JSON.parse(localStorage.getItem('commandes'));
                    
                    commandes.push(res.data);
                    localStorage.setItem('commandes',JSON.stringify(commandes));
                    
                    let commande    = this.state.commande;
                    commande.id     =  res.data.id;
                    commande.user   = res.data.user;
                    commande.date   = res.data.date;
                    this.setState({commande});
                    this.state.commande.lignes.map((c) => {
                        
                        return api.post('/lignecommandes',{
                                "article"   : "/api/articles/" + c.article.id,
                                "quantite"  : c.quantite,
                                "prix"      : parseFloat(c.prix),
                                "commande"   : "/api/commandes/"+res.data.id
                            }).then(
                                res => {
                                    console.log(res.data);
                                    let articles = JSON.parse(localStorage.getItem('articles'));
                                    for(let i=0;i<articles.length;i++){
                                        if(articles[i].id==c.article.id){
                                            articles[i].stocks.push({qtestock:-c.quantite});
                                            this.setState({ articles });
                                        }
                                    }
                                    localStorage.setItem('articles',JSON.stringify(articles));
                                    this.onCategorySelect(res.data.article.category.id);
                                },
                                err => {
                                    console.log(err)
                                }
                            )
                    })
                    this.setState({message: <div className="alert alert-success">Commande Sauvgardé avec l'ID: {res.data.id} </div>})
                    this.setState({saved: true});
                    this.onCommandeNew();
                }
            },
            err => {
                console.log(err)
            }
        )
    }

   


    render(){
        if(!localStorage.getItem('user'))
            return <Redirect to="/" />
            
        if(this.state.redirect)
            return <Redirect to="/categories" />
         
            return (
                <div>
                <Print commande={this.state.commande}  settings={this.state.settings} user={this.state.user}  />
                <Nav />
                <div class="btn-group btn-group-justified fixed-bottom   d-md-none d-sm-block">
                    <a class="btn btn-info" href="#categories">Catégories</a>
                    <a class="btn btn-success" href="#articles">Articles</a>
                    <a class="btn btn-warning" href="#panier">Commande</a>
                </div>
                <div className="row d-print-none" style={{height:"600px"}}>
                
                    <div id="categories" className="col-md-2 border  overflow-auto h-100 p-1">
                        
                        { this.state.categories.map(categorie => 
                            <a href="#articles" className="btn btn-sm btn-light m-1 d-block text-left w-100"  key={categorie.id}
                                onClick={this.onCategorySelect.bind(this,categorie.id)}>
                                <img src={localStorage.getItem('server')+'/../'+categorie.image} className="mr-2" style={{height: '50px'}} />
                                <strong>{categorie.title}</strong>
                            </a>
                        )}
                        { this.state.messageCategories }        
                           
                    </div>

                    <div id="articles" className="col-md-5 border  overflow-auto h-100">
                        
                        {this.state.messages.article }
                        { this.state.articlesByCategory.map(article => 
                            <a href="#panier" className="btn btn-sm btn-light m-1" 
                                key={article.id}
                                onClick={article.stocks.reduce((a, b) => parseFloat(a) + parseFloat(b.qtestock), 0)>0 && this.onArticleSelect.bind(this,article.id, article.title, article.price)}>
                                <img src={localStorage.getItem('server')+'/../'+article.image} style={{width: '80px'}} />
                                <br/>
                                {article.title} 
                                <br/>
                                <strong>{article.price} DH</strong>
                                <br/>
                                <samll style={{color:'#aaa',fontSize:'11px'}}>{article.stocks.reduce((a, b) => parseFloat(a) + parseFloat(b.qtestock), 0)} en stock</samll>
                            </a>
                        )}   
                    </div>

                    <div id="panier" className="col-md-5 p-2 h-100 border">
                        {this.state.message} 
                        <div className="table-responsive">
                            <div className="row p-2">
                                <div className="col">
                                    <button onClick={(event)=>{
                                        event.preventDefault();
                                        this.refresh();
                                        }
                                        } className="btn m-1 btn-sm btn-dark" > 
                                        <i class={this.state.loading?"fas fa-sync fa-spin":"fas fa-sync"}></i>
                                    </button> 
                                    <i className="fa fa-user"></i>  {this.state.user.nom} {this.state.user.prenom}
                                </div>
                                
                                <div className="col text-center big">
                                    TOTAL: <strong>{parseFloat(this.state.commande.total).toFixed(2)} DH</strong>
                                </div>
                                <div className="col text-right">
                                    <button className="btn btn-info mr-1"
                                        onClick={this.onCommandePost.bind(this)}>
                                            Valider
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive"  style={{height:"527px"}}>
                                <table className="print table table-bordered bg-white table-striped">
                                    <thead>
                                        <tr>
                                            <th>Article</th>
                                            <th>Prix</th>
                                            <th>Quantité</th>
                                            <th>Montant</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.state.commande.lignes.map((commande,index) => 
                                            
                                            <tr key={index}>
                                                <td>{commande.article.intitule}</td>
                                                <td>{commande.prix}</td>
                                                <td>
                                                    <table class="w-100">
                                                        <tr>
                                                            <td class="p-1 text-center">
                                                                <button className="btn btn-sm btn-warning"
                                                                    onClick={this.onLigneQteUpdate.bind(this,index,-1)}>-
                                                                </button>
                                                            </td>
                                                            <td class="p-1 text-center">
                                                                <span className="p-2 ">{commande.quantite}</span>
                                                            </td>
                                                            <td class="p-1 text-center">
                                                                <button className="btn btn-sm btn-warning"
                                                                    onClick={this.onLigneQteUpdate.bind(this,index,1)}>+
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>{commande.montant}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-danger"
                                                    onClick={this.onArticleDelete.bind(this,index)}>X</button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>      
                                </table>
                            </div>
                        </div>  
                    </div>
                    
                </div>
            </div>
           
          );
    }
}

export default commandeNew;  
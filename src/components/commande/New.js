import React from 'react';
import {Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';
import date from '../helpers/date';


class commandeNew extends React.Component{
    state = { 
              redirect          : null,
              print             : false,
              categories        : [],
              articles          : [],
              commande          : {id:null, lignes: [], user: null, date: null, total: 0, caisse:false, annulee: false },
              user              : JSON.parse(localStorage.getItem('user')),
              settings          : {},
              messages          : {article: ''},
              message           : '',
              saved             : false 
            };

    componentDidMount(){
        this.categoriesRefresh();
        api.get('/settings/'+1)
        .then(res => {
            const settings = res.data;
            this.setState({ settings }); 
        });
       
    }

    

    categoriesRefresh(){
        api.get('/categories')
            .then(res => {
                const categories = res.data;
                this.setState({ categories }); 
        })
        api.get('/articles?category=1')
            .then(res => {
                const articles = res.data;
                this.setState({ articles }); 
        })  
    }
 

    

    onCategorySelect = (id) => {
        let message = "Chargement en cours..";
        let messages = this.state.messages;
        messages.article = message;
        this.setState({messages});
        let articles = this.state.articles;
        articles = [];
        this.setState({articles});
        api.get('/articles?category='+id)
            .then(res => {
                const articles = res.data;
                if(articles.length==0){
                    let message = "Aucun article";
                    let messages = this.state.messages;
                    messages.article = message;
                    this.setState({messages}); 
                }else{
                    this.setState({ articles });
                    let message = "";
                    let messages = this.state.messages;
                    messages.article = message;
                    this.setState({messages}); 
                }
                
        }) 
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
        commande.lignes[index].quantite = parseInt(commande.lignes[index].quantite) + parseInt(value);
        commande.lignes[index].montant  = (parseFloat(commande.lignes[index].prix) * parseFloat(commande.lignes[index].quantite)).toFixed(2);
        commande.total = (commande.lignes.reduce((a, b) => parseFloat(a) + parseFloat(b.montant), 0)).toFixed(2);
        console.log(commande.total);
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
        //  ajout une commande
        if(this.state.saved)
            return false;
            
        this.setState({message: <div className="alert alert-warning">Commande en cours de sauvgarde..</div>})
        api.post('/commandes',{user:'/api/users/' + this.state.user.id, date: date(), caisse: false, annulee: false}).then(
            res => {
                if(res.data.id){
                    let commande    = this.state.commande;
                    commande.id     =  res.data.id;
                    commande.user   = res.data.user;
                    commande.date   = res.data.date;
                    this.setState({commande});
                    this.state.commande.lignes.map((c) => {
                        //  ajout une ligne de commande
                        return api.post('/lignecommandes',{
                                "article"   : "/api/articles/" + c.article.id,
                                "quantite"  : c.quantite,
                                "prix"      : parseFloat(c.prix),
                                "commande"   : "/api/commandes/"+res.data.id
                            }).then(
                                res => {
                                    console.log(res.data);
                                },
                                err => {
                                    console.log(err)
                                }
                            )
                    })
                    this.setState({message: <div className="alert alert-success">Commande Sauvgardé avec l'ID: {res.data.id} </div>})
                    this.setState({saved: true});
                    let credit = (parseFloat(this.state.credit)+parseFloat(this.state.commande.total)).toFixed(2);
                    this.setState({credit});
                    window.print();
                }
            },
            err => {
                console.log(err)
            }
        )
    }

   


    render(){
        if(this.state.redirect)
            return <Redirect to="/categories" />
         
            return (
                <div>
                        <div className="bg-white p-3 text-center d-none d-print-block">
                            <div dangerouslySetInnerHTML={{__html: this.state.settings.printhead}} />
                            <div className="row">
                                <div className="col">
                                Commande N° {this.state.commande.id && this.state.commande.id}
                                </div>
                                <div className="col">
                                    Serveur: {this.state.user && this.state.user.nom} {this.state.user && this.state.user.prenom}
                                </div>
                            </div> 
                            <table className="table tablebordered">
                                <thead>
                                    <tr>
                                        <th>Article</th>
                                        <th>Prix</th>
                                        <th>Quantité</th>
                                        <th>Montant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.commande.lignes.map((commande,index) => 
                                        
                                        <tr key={index}>
                                            <td>{commande.article.intitule}</td>
                                            <td>{commande.prix}</td>
                                            <td>
                                                <span className="p-2">{commande.quantite}</span>
                                            </td>
                                            <td>{commande.montant}</td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot  > 
                                    <tr>
                                        <th>TOTAL</th>
                                        <th colSpan="4" className="text-right"></th>
                                    </tr>
                                </tfoot>
                                
                            </table>
                            <p>
                            {this.state.commande.date && this.state.commande.date.split("T")[0]} - 
                            {this.state.commande.date && this.state.commande.date.split("T")[1]}   
                            </p>
                            
                            <div dangerouslySetInnerHTML={{__html: this.state.settings.printfoot}} />
                                
                            
                        </div>
            
                <Nav />
                <div className="row h-100 d-print-none h-100">
                
                    <div className="col-md-2">
                        <div className="card m-3">
                            <div className="card-header">
                                Catégories
                            </div>
                            <div className="card-body overflow-auto" style={{height:"400px"}}>
                                
                                { this.state.categories.map(categorie => 
                                    
                                        
                                        <button className="btn btn-sm btn-light m-1"  key={categorie.id}
                                            onClick={this.onCategorySelect.bind(this,categorie.id)}>
                                            <img src={categorie.image}  style={{width: '90px'}} />
                                            <br/>
                                            {categorie.title}
                                        </button>
                                    
                                )}
                                { this.state.categories.length==0 &&
                                    <p>...</p>
                                }
                                
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card m-3 ">
                            <div className="card-header">
                                Articles
                            </div>
                            <div className="card-body  overflow-auto" style={{height:"400px"}}>
                                {this.state.messages.article }
                                { this.state.articles.map(article => 
                                    <button className="btn btn-sm btn-light m-1" 
                                        key={article.id}
                                        onClick={this.onArticleSelect.bind(this,article.id, article.title, article.price)}>
                                        <img src={article.image} style={{width: '80px'}} />
                                        <br/>
                                        {article.title} 
                                        <br/>
                                        <strong>{article.price} DH</strong>
                                    </button>
                                )}   
                                                              
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card m-3">
                            <div className="card-header">
                                Commande
                            </div>
                            <div className="card-body" style={{height:"400px"}}>
                                {this.state.message} 
                                <div className="table-responsive mb-1">
                                    <div className="row">
                                        <div className="col">
                                            <i className="fa fa-user"></i> {this.state.user.nom} {this.state.user.prenom}
                                        </div>
                                        
                                        <div className="col text-right">
                                            TOTAL: <strong>{parseFloat(this.state.commande.total).toFixed(2)} DH</strong>
                                        </div>
                                    </div>
                                    <div className="table-responsive" style={{height:"270px"}}>
                                        <table className="print table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Article</th>
                                                    <th>Prix</th>
                                                    <th>Quantité</th>
                                                    <th>Montant</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                { this.state.commande.lignes.map((commande,index) => 
                                                    
                                                    <tr key={index}>
                                                        <td>{commande.article.intitule}</td>
                                                        <td>{commande.prix}</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-warning"
                                                                onClick={this.onLigneQteUpdate.bind(this,index,-1)}>-
                                                            </button>
                                                            <span className="p-2">{commande.quantite}</span>
                                                            <button className="btn btn-sm btn-warning"
                                                                onClick={this.onLigneQteUpdate.bind(this,index,1)}>+
                                                            </button>
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
                            <div className="card-footer bg-warning text-white text-right">
                                <button className="btn btn-light m-1" 
                                    onClick={this.onCommandeNew.bind(this)}>
                                        Nouveau
                                </button>
                                <button className="btn btn-light m-1"
                                    onClick={this.onCommandePost.bind(this)}>
                                        Valider
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
           
          );
    }
}

export default commandeNew;  
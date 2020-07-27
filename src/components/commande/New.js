import React from 'react';
import { Link ,Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class commandeNew extends React.Component{
    state = { 
              redirect   : null,
              categories : [],
              articles   : [],
              commande   : { lignes: [], total: 0 },
              user       : JSON.parse(localStorage.getItem('user'))
            };

    componentDidMount(){
        this.categoriesRefresh();
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
        api.get('/articles?category='+id)
            .then(res => {
                const articles = res.data;
                this.setState({ articles }); 
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
    }

    onCommandePost = (event) => {
        event.preventDefault();
        //  ajout une commande
        api.post('/commandes',{user:'/api/users/' + this.state.user.id, date: "2020-07-25"}).then(
            res => {
                if(res.data.id){
                    this.state.commande.lignes.map((c) => {
                        //  ajout une ligne de commande
                        return api.post('/lignecommandes',{
                                "article"   : "/api/articles/" + c.article.id,
                                "quantite"  : c.quantite,
                                "prix"      : parseFloat(c.prix),
                                "commande": "/api/commandes/"+res.data.id
                            }).then(
                                res => {
                                    console.log(res.data);
                                    this.onCommandeNew();
                                },
                                err => {
                                    console.log(err)
                                }
                            )
                    })
                    
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
                <Nav />
                 
                <div className="row h-100">
                   
                    <div className="col-md-2">
                        <div className="card m-3 h-100">
                             
                            <div className="card-body">
                                { this.state.categories.map(categorie => 
                                    <div key={categorie.id}>
                                        
                                        <button className="w-100 my-1" 
                                            onClick={this.onCategorySelect.bind(this,categorie.id)}>
                                            <img src={'/img/foods/'+categorie.image} className="w-100"/>
                                        </button>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card m-3">
                            
                            <div className="card-body">
                                
                                { this.state.articles.map(article => 
                                    <button className="btn  btn-light m-1" 
                                        key={article.id}
                                        onClick={this.onArticleSelect.bind(this,article.id, article.title, article.price)}>
                                        
                                        <img src={'/img/foods/'+article.image} style={{width: '100px'}} />
                                        <br/>
                                        {article.title} <strong>{article.price} DH</strong>
                                    </button>
                                )}                                
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card m-3">
                            
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
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
                                                        <button className="btn btn-warning"
                                                            onClick={this.onLigneQteUpdate.bind(this,index,-1)}>-
                                                        </button>
                                                        <span className="p-2">{commande.quantite}</span>
                                                        <button className="btn btn-warning"
                                                            onClick={this.onLigneQteUpdate.bind(this,index,1)}>+
                                                        </button>
                                                    </td>
                                                    <td>{commande.montant}</td>
                                                    <td>
                                                        <button className="btn btn-danger"
                                                        onClick={this.onArticleDelete.bind(this,index)}>X</button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot  > 
                                            <tr>
                                                <th>TOTAL</th>
                                                <th colSpan="4" className="text-right">{this.state.commande.total}</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>   
                            </div>
                            <div className="card-footer bg-success text-white text-right">
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
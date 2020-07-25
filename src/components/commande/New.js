import React from 'react';
import { Link ,Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class commandeNew extends React.Component{
    state = { redirect   : null,
              categories : [],
              articles   : [],
              commande   : { lignes: [], total: 0 } ,
            };

    categoriesRefresh(){
        api.get('/categories')
            .then(res => {
                const categories = res.data;
                this.setState({ categories }); 
        }) 
    }

    onCategorySelect = (id) => {
        api.get('/articles/?category='+id)
            .then(res => {
                const articles = res.data;
                this.setState({ articles }); 
        }) 
    }

    componentDidUpdate(){
        
    }

    componentDidMount(){
        this.categoriesRefresh();
    }
     

    onArticleSelect = (id,intitule, prix ) => {
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

    onArticleDelete = (id) => {
        console.log("deleting"+id);
        let commande = this.state.commande;
        commande.lignes.splice(0,id);
        this.setState({commande});
    }

    onCommandePost = (event) => {
        event.preventDefault();
        //  ajout une commande
        api.post('/commandes',{user:'/api/users/1',date: "2020-07-25"}).then(
            res => {
                if(res.data.id){
                    this.state.commande.lignes.map((c) => {
                        //  ajout une ligne de commande
                        api.post('/lignecommandes',{
                            "article"   : "/api/articles/" + c.article.id,
                            "quantite"  : c.quantite,
                            "prix"      : parseFloat(c.prix),
                            "commande": "/api/commandes/"+res.data.id
                        }).then(
                            res => {
                                console.log(res.data);
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
                <div className="m-3 text-right">
                    <Link className="btn btn-info pull-right" to="/categories" >Commandes</Link>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card m-3">
                            <div className="card-header bg-info text-white">
                                Catégories
                            </div>
                            <div className="card-body">
                                { this.state.categories.map(categorie => 
                                    <button className="btn btn-secondary  w-100 my-1" 
                                        key={categorie.id}
                                        onClick={this.onCategorySelect.bind(this,categorie.id)}>
                                        {categorie.title}
                                    </button>
                                )}
                                
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card m-3">
                            <div className="card-header bg-info text-white">
                                Articles
                            </div>
                            <div className="card-body">
                                { this.state.articles.map(article => 
                                    <button className="btn  btn-secondary w-100 my-1" 
                                        key={article.id}
                                        onClick={this.onArticleSelect.bind(this,article.id, article.title, article.price)}>
                                        {article.title} <strong>{article.price} DH</strong>
                                    </button>
                                )}                                
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card m-3">
                            <div className="card-header bg-info text-white">
                                Commande
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead  >
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
                                                    <td>{commande.quantite}</td>
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
                                                <th colspan="4" className="text-right">{this.state.commande.total}</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>   
                            </div>
                            <div className="card-footer bg-success text-white text-right">
                                <button className="btn btn-light" 
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
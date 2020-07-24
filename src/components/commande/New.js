import React from 'react';
import { Link ,Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class commandeNew extends React.Component{
    state = { redirect: null,
              categories : [],
              articles   : [],
              commande   : { lignes: [], total: 0.00 } 
            };

    categoriesRefresh(){
        api.get('/categories')
            .then(res => {
                const categories = res.data;
                this.setState({ categories }); 
        }) 
    }

    componentDidMount(){
        this.categoriesRefresh();
    }
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.post('/categories',{title: this.state.title})
            .then(res => {
                console.log(res);
                this.setState({redirect: true});
        })  
    }

    onCategorySelect = (id) => {
        api.get('/articles/?category='+id)
            .then(res => {
                const articles = res.data;
                this.setState({ articles }); 
        }) 
    }

    onArticleSelect = (article, prix ) => {
        let ligne        = {};
        ligne.article    = article;
        ligne.prix       = parseFloat(prix).toFixed(2);
        ligne.quantite   = 1;

        let montant      = parseFloat((prix * 1)).toFixed(2);
        ligne.montant    = montant;

        let commande = this.state.commande;
        commande.lignes.push(ligne);
        commande.total += montant;
        this.setState({commande});

    }

    onArticleDelete = (id) => {
         

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
                            <div className="card-header bg-secondary text-white">
                                Catégories
                            </div>
                            <div className="card-body">
                                { this.state.categories.map(categorie => 
                                    <button className="btn btn-success w-100 my-1" 
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
                                    <button className="btn btn-success w-100 my-1" 
                                        key={article.id}
                                        onClick={this.onArticleSelect.bind(this,article.title, article.price)}>
                                        {article.title}
                                    </button>
                                )}                                
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card m-3">
                            <div className="card-header bg-success text-white">
                                Commande
                            </div>
                            <div className="card-body">
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
                                        { this.state.commande.lignes.map(commande => 
                                            <tr>
                                                <td>{commande.article}</td>
                                                <td>{commande.prix}</td>
                                                <td>{commande.quantite}</td>
                                                <td>{commande.montant}</td>
                                                <td>
                                                    <button className="btn btn-danger">X</button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>TOTAL</th>
                                            <th colspan="4" className="text-right">{this.state.commande.total}</th>
                                        </tr>
                                    </tfoot>
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
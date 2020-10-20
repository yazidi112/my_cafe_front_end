import React from 'react';
import { Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';


class StockNew extends React.Component{
    state = { redirect: null,
              stock : {fournisseur : null, article: null, prixachat: null, qteinitial: null, qtestock: null, date: new Date()},
              fournisseurs : [] ,
              articles : [] ,
              message: '' 
            };
     
     

     
    componentDidMount(){
        api.get('/articles')
            .then(res => {
                this.setState({articles: res.data});
        });
        api.get('/fournisseurs')
            .then(res => {
                this.setState({fournisseurs: res.data});
        })   
    }
     
    onFormSubmit = (event) => {
        event.preventDefault();
        this.setState({message: <div className="alert alert-warning">Ajout en cours..</div>})
        api.post('/stocks',this.state.stock).then(
            res => {
                this.setState({message: <div className="alert alert-success">Article est bien ajouté.</div>})
                this.setState({redirect: true});
            },
            err =>{
                this.setState({message: <div className="alert alert-danger">Une erreur est survenu merci de ressayer.</div>})
            }
        )  
    }

    render(){
        if(this.state.redirect)
            return <Redirect to="/articles" />
        return (
            <div>
                <Nav />
                <div className="container"> 
                <div className="card m-3">
                    <div className="card-header bg-info text-white">
                         Ajouter un article au stock
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onFormSubmit}>
                            {this.state.message}
                            <div className="form-group">
                                <label>Fournisseur</label>
                                <select onChange={(event)=>{
                                    let stock = this.state.stock;
                                    stock.fournisseur = "/api/fournisseurs/"+event.target.value;
                                    this.setState({stock});
                                    console.log(event.target.value);
                                    }} className="form-control">
                                    <option>Choisir un fournisseur</option>
                                    {this.state.fournisseurs.map( f => {
                                        return <option key={f.id} value={f.id}>{f.nom} {f.prenom}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Article</label>
                                <select onChange={(event)=>{
                                    let stock = this.state.stock;
                                    stock.article = "/api/articles/"+event.target.value;
                                    this.setState({stock});
                                    console.log(event.target.value);
                                    }} className="form-control">
                                    <option>Choisir un article</option>
                                    {this.state.articles.map( a => {
                                        return <option key={a.id} value={a.id}>{a.title}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Prix d'achat</label>
                                <input type="text" onChange={(event)=>{
                                    let stock = this.state.stock;
                                    stock.prixachat = parseFloat(event.target.value);
                                    this.setState({stock});
                                    }} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Quantité</label>
                                <input type="text" onChange={(event)=>{
                                    let stock = this.state.stock;
                                    stock.qtestock = parseFloat(event.target.value);
                                    stock.qteinitial = parseFloat(event.target.value);
                                    this.setState({stock});
                                    }} className="form-control" />
                            </div>

                            <button className="btn btn-primary">Ajouter</button>
                        </form>
                         
                    </div>
                </div>
                </div>
            </div>
           
          );
    }
}

export default StockNew;  
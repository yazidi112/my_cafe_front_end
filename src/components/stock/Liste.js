import React from 'react';
import { Link }  from 'react-router-dom';
import api from '../../apis/api';
import Nav from '../Nav';

class Stock extends React.Component{
    state = { 
        stocks        : [],
        message         : '',
        page            : 1,
        itemsPerPage    : 10,
    };

    refresh = () =>{
        this.setState({message: <div className="alert alert-warning">Chargement en cours..</div>});
        api.get('/stocks')
            .then(res => {
                const stocks = res.data;
                this.setState({ stocks });
                this.setState({message:  ''});
        }) 
    }

    onChangePage = (pas) =>{
        let page = this.state.page;
        page     = parseInt(page) + parseInt(pas);
        this.setState({page});
        api.get('/articles?itemsPerPage='+this.state.itemsPerPage+'&page='+page)
            .then(res => {
                const articles = res.data;
                this.setState({ articles });
                this.setState({message: <div className="alert alert-success">Chargement términé.</div>});
        }) 
    }

    componentDidMount(){
        this.refresh();
    }
     
    onDelete = (id) => {
        if(!window.confirm("Etes-vous sûr de vouloir supprimer ?"))
            return false;
        this.setState({message: <div className="alert alert-warning">Suppression en cours..</div>});
        api.delete(`/articles/${id}`).then(
            res => {
                this.setState({message: <div className="alert alert-success">Suppression effectué.</div>});
                this.refresh();
            },
            err => {
                this.setState({message: <div className="alert alert-danger"><strong>Erreur: </strong>Suppression n'est pas effectué.</div>});
            })  
    }
 

    render(){
        return (
            <div>
                <Nav />
                <div className="container">
                    <div className="card m-3">
                        <div className="card-header bg-info text-white">
                            Stock 
                        </div>
                        <div className="card-body">
                        {this.state.message}
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Fournisseur</th>
                                        <th>Article</th>
                                        <th>Prix Achat</th>
                                        <th>Quantité initial</th>
                                        <th>Quantité en stock</th>
                                        <th style={{width : 200}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.stocks.map(stock => 
                                        <tr key={stock.id}>
                                            <td>{stock.fournisseur.nom} {stock.fournisseur.prenom}</td>
                                            <td>{stock.article.title} </td>
                                            <td>{stock.prixachat} DH</td>
                                            <td>{stock.qteinitial} </td>
                                            <td>{stock.qtestock} </td>
                                            <td>
                                                <a href="#"  className="btn btn-sm btn-danger  mr-3" onClick={this.onDelete.bind(this,stock.id)}>Supprimer</a>  
                                                <Link className="btn btn-sm btn-success" to={`/articles/edit/${stock.id}`} >Modifier</Link> 
                                            </td>
                                        </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <small>Page: <strong>{this.state.page}</strong></small>
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    {this.state.page == 1 &&
                                        <button class="page-link" href="#" disabled>Précedant</button>
                                    }
                                    {this.state.page>1 && 
                                        <button  class="page-link" href="#" onClick={this.onChangePage.bind(this,-1)}>Précedant</button>
                                    }
                                </li>
                                <li className="page-item">
                                {this.state.stocks.length == 0 && 
                                    <button  className="page-link" href="#"  disabled>Suivant</button >
                                }

                                {this.state.stocks.length > 0 && 
                                    <button  className="page-link" href="#"  onClick={this.onChangePage.bind(this,1)}>Suivant</button >
                                }
                                </li>
                            </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            
          );
    }
}

export default Stock;  

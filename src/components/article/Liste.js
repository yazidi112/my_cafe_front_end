import React from 'react';
import { Link }  from 'react-router-dom';
import api from '../../apis/api';
import Nav from '../Nav';

class Article extends React.Component{
    state = { 
        articles        : [],
        message         : '',
        page            : 1,
        itemsPerPage    : 10,
    };

    articlesRefresh = () =>{
        this.setState({message: <div className="alert alert-warning">Chargement en cours..</div>});
        api.get('/articles?itemsPerPage='+this.state.itemsPerPage+'&page='+this.state.page)
            .then(res => {
                const articles = res.data;
                this.setState({ articles });
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
        this.articlesRefresh();
    }
     
    onDelete = (id) => {
        if(!window.confirm("Etes-vous sûr de vouloir supprimer ?"))
            return false;
        this.setState({message: <div className="alert alert-warning">Suppression en cours..</div>});
        api.delete(`/articles/${id}`).then(
            res => {
                this.setState({message: <div className="alert alert-success">Suppression effectué.</div>});
                this.articlesRefresh();
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
                             Articles 
                        </div>
                        <div className="card-body">
                        {this.state.message}
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Titre</th>
                                        <th>Prix</th>
                                        <th>Catégorie</th>
                                        <th style={{width : 200}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.articles.map(article => 
                                        <tr key={article.id}>
                                            <td><img src={localStorage.getItem('server')+'/../'+article.image} style={{width: '100px'}} /></td>
                                            <td>{article.title}</td>
                                            <td>{article.price}</td>
                                            <td>{article.category.title}</td>
                                            <td>
                                                <a href="#"  className="btn btn-sm btn-danger  mr-3" onClick={this.onDelete.bind(this,article.id)}>Supprimer</a>  
                                                <Link className="btn btn-sm btn-success" to={`/articles/edit/${article.id}`} >Modifier</Link> 
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
                                {this.state.articles.length == 0 && 
                                    <button  className="page-link" href="#"  disabled>Suivant</button >
                                }

                                {this.state.articles.length > 0 && 
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

export default Article;  

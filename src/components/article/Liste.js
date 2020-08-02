import React from 'react';
import { Link }  from 'react-router-dom';
import api from '../../apis/api';
import Nav from '../Nav';

class Article extends React.Component{
    state = { 
        articles : [],
        message: ''
    };

    articlesRefresh(){
        api.get('/articles')
            .then(res => {
                const articles = res.data;
                this.setState({ articles }); 
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
                                        <td><img src={article.image} style={{width: '100px'}} /></td>
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
                    </div>
                </div>
            </div>
            
          );
    }
}

export default Article;  
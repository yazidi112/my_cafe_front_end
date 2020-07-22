import React from 'react';
import { Link }  from 'react-router-dom';
import api from '../../apis/api';
import Nav from '../Nav';

class Article extends React.Component{
    state = { 
        articles : [],
        artcileNewData: {title:'', price: ''},
        articleEditData: {id:'', title:'', price: ''},
        modalEditDisplay: ''
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

        api.delete(`/articles/${id}`).then(res => {
            console.log(res);
            this.articlesRefresh();
        })  
    }

     

     

    render(){
        return (
            <div>
                <Nav />
                <div class="m-3 text-right">
                    <Link className="btn btn-info pull-right" to="/articles/new" >Ajouter un article</Link>
                </div>
                <div className="card m-3">
                    <div className="card-header bg-info text-white">
                        <h3 class="card-title">Liste des articles</h3>
                    </div>
                    <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titre</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.articles.map(article => 
                                <tr key={article.id}>
                                    <td>{article.id}</td>
                                    <td>{article.title}</td>
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
            
          );
    }
}

export default Article;  
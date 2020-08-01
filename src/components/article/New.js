import React from 'react';
import { Link ,Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class ArticleNew extends React.Component{
    state = { redirect: null,
              article : {title : null, price: null, image: null, category: null},
              categories : [] ,
              message: ''
            };

    componentDidMount(){
        api.get('/categories')
            .then(res => {
                console.log(res.data);
                let categories = res.data;
                this.setState({categories});
        })  
    }
     
    onFormSubmit = (event) => {
        event.preventDefault();
        this.setState({message: <div className="alert alert-warning">Ajout en cours..</div>})
        api.post('/articles',this.state.article).then(
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
                        <h3 className="card-title">Ajouter un article</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onFormSubmit}>
                            {this.state.message}
                            <div className="form-group">
                                <label>Titre</label>
                                <input type="text" onChange={(event)=>{
                                    let article = this.state.article;
                                    article.title= event.target.value;
                                    this.setState({article});
                                    }} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Prix</label>
                                <input type="text" onChange={(event)=>{
                                    let article = this.state.article;
                                    article.price = parseFloat(event.target.value);
                                    this.setState({article});
                                    }} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input type="text" onChange={(event)=>{
                                    let article = this.state.article;
                                    article.image = event.target.value;
                                    this.setState({article});
                                    }} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Catégorie</label>
                                <select onChange={(event)=>{
                                    let article = this.state.article;
                                    article.category = "/api/categories/"+event.target.value;
                                    this.setState({article});
                                    console.log(event.target.value);
                                    }} className="form-control">
                                    <option>Choisir une catégorie</option>
                                    {this.state.categories.map( category => {
                                        return <option key={category.id} value={category.id}>{category.title}</option>
                                    })}
                                </select>
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

export default ArticleNew;  
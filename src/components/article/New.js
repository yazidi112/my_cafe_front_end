import React from 'react';
import { Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';
import axios from 'axios';


class ArticleNew extends React.Component{
    state = { redirect: null,
              article : {title : null, price: null, image: null, category: null},
              categories : [] ,
              message: '' 
            };
     
     

    onImageUpload(event) {
        
        if (event.target.files && event.target.files[0]) {
             
            const formData = new FormData()
            formData.append("file",event.target.files[0]);

            axios.post(`http://localhost:8000/upload`,formData).then(
                res =>{
                    let article = this.state.article;
                    article.image = res.data.url;
                    this.setState({article});
                }) 
        }
    }
    
    componentDidMount(){
        api.get('/categories')
            .then(res => {
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
                         Ajouter un article 
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
                            <div className="form-group">
                                <label>Image</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <img src={this.state.article.image} className="d-block" style={{width: "32px"}} />
                                        </div>
                                    </div>
                                    <input type="text" value={this.state.article.image} readOnly className="form-control" />
                                </div>
                                <input type="file" className="form-control-file" onChange={this.onImageUpload.bind(this)} />
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
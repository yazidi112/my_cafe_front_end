import React from 'react';
import {Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';
import axios from 'axios';

class ArticleNew extends React.Component{
    state = { 
        article     : {id: null, title : null, price: null, category: null, image: null },
        categories  : [],
        redirect    : null
    };

    constructor(props){
        super(props);
        const { match: { params } } = props;
        api.get('/articles/'+params.id)
            .then(res => {
                const article = res.data;
                article.category = "/api/categories/"+article.category.id;
                this.setState({ article }); 
        });
        api.get('/categories')
            .then((res)=>{
                let categories = res.data;
                this.setState({categories});
        }) 
    }

     

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
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.put('/articles/'+this.state.article.id,this.state.article)
            .then(res => {
                this.setState({redirect: true});
        })  
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
                             Modifier un article 
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <label>Titre</label>
                                    <input type="text" value={this.state.article.title} onChange={(event)=>{
                                        let article = this.state.article;
                                        article.title = event.target.value;
                                        this.setState({article})}
                                        } className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Prix</label>
                                    <input type="text" value={this.state.article.price} onChange={(event)=>{
                                        let article = this.state.article;
                                        article.price = event.target.value;
                                        this.setState({article})}
                                        } className="form-control" />
                                </div>
                                 
                                <div className="form-group">
                                    <label>Catégorie</label>
                                    <select onChange={(event)=>{
                                        let article = this.state.article;
                                        article.category = "/api/categories/"+event.target.value;
                                        this.setState({article});
                                        }} className="form-control">
                                        {this.state.article.id && this.state.categories.map( category => {
                                            if(category.id == this.state.article.category.id){
                                                return <option key={category.id} 
                                                value={category.id} selected>
                                                    {category.title}
                                                </option>
                                            }else{
                                                return <option key={category.id} 
                                                value={category.id}>
                                                    {category.title}
                                                </option>
                                            }
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
                                <button className="btn btn-primary">Modifier</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}

export default ArticleNew;  
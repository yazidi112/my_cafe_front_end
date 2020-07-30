import React from 'react';
import { Link, Redirect }  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class ArticleNew extends React.Component{
    state = { 
        data : {id: '', title : null, price: null, category: null },
        categories : [],
        redirect : null
    };

     componentDidMount(){
        const { match: { params } } = this.props;
        api.get('/articles/'+params.id)
            .then(res => {
                const data = res.data;
                this.setState({ data }); 
        });
        api.get('/categories')
            .then(res => {
                console.log(res.data);
                let categories = res.data;
                this.setState({categories});
        }) 
     }
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.put('/articles/'+this.state.data.id,this.state.data)
            .then(res => {
                console.log(res);
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
                            <h3 className="card-title">Modifier un article</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <label>Titre</label>
                                    <input type="text" value={this.state.data.title} onChange={(event)=>{
                                        let data = this.state.data;
                                        data.title = event.target.value;
                                        this.setState({data})}
                                        } className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Prix</label>
                                    <input type="text" value={this.state.data.price} onChange={(event)=>{
                                        let data = this.state.data;
                                        data.title = event.target.value;
                                        this.setState({data})}
                                        } className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Catégorie</label>
                                    <select onChange={(event)=>{
                                        let data = this.state.data;
                                        data.category = "/api/categories/"+event.target.value;
                                        this.setState({data});
                                        console.log(event.target.value);
                                        }} className="form-control">
                                        {this.state.categories.map( category => {
                                            if(category.id == this.state.data.category.id){
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
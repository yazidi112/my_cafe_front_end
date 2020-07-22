import React from 'react';
import { Link }  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class ArticleNew extends React.Component{
    state = { title : null, price: null };

     
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.post('/articles',{title: this.state.title, price: parseFloat(this.state.price)})
            .then(res => {
                console.log(res);
        })  
    }

    render(){
        return (
            <div>
                 <Nav />
                <div className="m-3 text-right">
                    <Link className="btn btn-info pull-right" to="/articles" >Articles</Link>
                </div>
                <div className="card m-3">
                    <div className="card-header bg-info text-white">
                        <h3 className="card-title">Ajouter un article</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group">
                                <label>Titre</label>
                                <input type="text" onChange={(event)=>{this.setState({title: event.target.value})}} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Prix</label>
                                <input type="text" onChange={(event)=>{this.setState({price: event.target.value})}} className="form-control" />
                            </div>
                            <button className="btn btn-primary">Ajouter</button>
                        </form>
                         
                    </div>
                </div>
            </div>
          );
    }
}

export default ArticleNew;  
import React from 'react';
import { Link ,Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class categoryNew extends React.Component{
    state = { redirect: null, title : null, image: null  };

     
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.post('/categories',{title: this.state.title, image: this.state.image})
            .then(res => {
                console.log(res);
                this.setState({redirect: true});
        })  
    }

    render(){
        if(this.state.redirect)
            return <Redirect to="/categories" />
        return (
            <div>
                 <Nav />
                <div className="container"> 
                    <div className="card m-3">
                        <div className="card-header bg-info text-white">
                            <h3 className="card-title">Ajouter une catégorie</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <label>Titre</label>
                                    <input type="text" onChange={(event)=>{this.setState({title: event.target.value})}} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Image</label>
                                    <input type="text" onChange={(event)=>{this.setState({image: event.target.value})}} className="form-control" />
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

export default categoryNew;  
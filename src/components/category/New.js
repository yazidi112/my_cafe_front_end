import React from 'react';
import { Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';
import axios from 'axios';

class categoryNew extends React.Component{
    state = { redirect: null, title : null, image: null  };

    onImageUpload(event) {
        
        if (event.target.files && event.target.files[0]) {
             
            const formData = new FormData()
            formData.append("file",event.target.files[0]);

            axios.post(`http://localhost:8000/upload`,formData).then(
                res =>{
                    this.setState({image: res.data.url});
                }) 
        }
    }
     
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
                            Ajouter une catégorie
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <label>Titre</label>
                                    <input type="text" onChange={(event)=>{this.setState({title: event.target.value})}} className="form-control" />
                                </div>
                                 
                                <div className="form-group">
                                    <label>Image</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <img src={this.state.image} className="d-block" style={{width: "32px"}} />
                                            </div>
                                        </div>
                                        <input type="text" value={this.state.image} readOnly className="form-control" />
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

export default categoryNew;  
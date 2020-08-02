import React from 'react';
import {   Redirect }  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';
import axios from 'axios';


class CategoryNew extends React.Component{
    state = { 
        data : {id: null, title : null , image: null },
        redirect : null
    };

    onImageUpload(event) {
        
        if (event.target.files && event.target.files[0]) {
             
            const formData = new FormData()
            formData.append("file",event.target.files[0]);

            axios.post(`http://localhost:8000/upload`,formData).then(
                res =>{
                    let data = this.state.data;
                    data.image = res.data.url;
                    this.setState({data});
                }) 
        }
    }

     componentDidMount(){
        const { match: { params } } = this.props;
        console.log(this.props);
        api.get('/categories/'+params.id)
            .then(res => {
                const data = res.data;
                this.setState({ data }); 
        }) 
     }
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.put('/categories/'+this.state.data.id,this.state.data)
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
                             Modifier un Catégorie 
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
                                    <label>Image</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <img src={this.state.data.image} className="d-block" style={{width: "32px"}} />
                                            </div>
                                        </div>
                                        <input type="text" value={this.state.data.image} readOnly className="form-control" />
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

export default CategoryNew;  
import React from 'react';
import {Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class userNew extends React.Component{
    state = { redirect: null,
              user : {  
                        nom         : null,
                        prenom      : null,
                        email       : null, 
                        password    : null, 
                        adresse     : null, 
                        tel         : null, 
                        role        :["ROLE_USER"]
                    }  
            };

    onFormSubmit = (event) => {
        event.preventDefault();
        api.post('/users/create', this.state.user)
            .then(res => {
                console.log(res);
                this.setState({redirect: true});
        })  
    }

    render(){
        if(this.state.redirect)
            return <Redirect to="/users" />
        return (
            <div>
                 <Nav />
                <div className="container">
               
                <div className="card m-3">
                    <div className="card-header bg-info text-white">
                        Ajouter un utilisateur
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group">
                                <label>Nom</label>
                                <input type="text" onChange={(event)=>{
                                    let user = this.state.user;
                                    user.nom = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Prénom</label>
                                <input type="text" onChange={(event)=>{
                                    let user = this.state.user;
                                    user.prenom = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Téléphone</label>
                                <input type="text" onChange={(event)=>{
                                    let user = this.state.user;
                                    user.tel = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Adresse</label>
                                <input type="text" onChange={(event)=>{
                                    let user = this.state.user;
                                    user.adresse = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
                            </div>


                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" onChange={(event)=>{
                                    let user = this.state.user;
                                    user.email = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Mot de passe</label>
                                <input type="text" onChange={(event)=>{
                                    let user = this.state.user;
                                    user.password = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
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

export default userNew;  
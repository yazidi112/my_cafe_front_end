import React from 'react';
import {Redirect} from 'react-router-dom';
import api from '../apis/api';
import jwt from 'jsonwebtoken';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

class Login extends React.Component{
    state = { id: '', email : '',password: '',nom: '', prenom: '', message: '', logged: false, personnes: []};

    componentDidMount() {
        api.get('../personnes').then(
            res => {
                let personnes = res.data;
                this.setState({personnes});
            }
        );
    }

    onEmailChange = ( id,email,nom,prenom) => {
         
        this.setState({email  : email});
        this.setState({id     : id});
        this.setState({nom    : nom});
        this.setState({prenom : prenom});
    }

    onPwdChange = (input) => {
        this.setState({password : input})
    }

    onLogin = (event) => {
        //this.setState({logged: true});
        //return false;
        event.preventDefault();
        let message = <div className="alert alert-warning">Connexion en cours..</div>
        this.setState({ message }); 
        api.post('login_check',{"username":this.state.email,"password": this.state.password }).then(
        res => {
            
            if(res.data.token){
                localStorage.setItem('token', res.data.token);
                this.setState({message: <div className="alert alert-success"> <strong>Success :</strong> Authentication effectué avec succes. redirection en cours..</div> });
                let roles = jwt.decode(res.data.token).roles;
                let user = {id: this.state.id, nom: this.state.nom, prenom: this.state.prenom, email: this.state.email,roles: roles}
                localStorage.setItem('user', JSON.stringify(user));
                this.setState({logged: true});
            }
                
        },
            err => {
                this.setState({message: <div className="alert alert-danger"> <strong>Erreur d'Authentification:</strong> Nom d'utilisateur ou mot de passe est incorrect.</div>});
        })  
    }
     
    render(){
        if(this.state.logged) 
            return <Redirect to={'/commande/new'} />
        return (
             <div className="container">
                <div className="card m-3">
                    <div className="card-header  bg-primary text-white">
                        <h3> My <i>Café</i> 2020 <small>Authentification</small></h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onLogin}>
                            {this.state.message} 
                            <div className="form-group">
                                    { this.state.personnes.length===0 && <small>Chargement des utilisateurs en cours..</small>}
                                    { this.state.personnes.map( p =>
                                        <button onClick={event => {
                                                event.preventDefault();
                                                this.onEmailChange(p.id,p.email,p.nom,p.prenom)
                                            }
                                        }
                                          className="btn m-2 btn-info">
                                            <i className="fas fa-user"></i> {p.nom} {p.prenom}
                                        </button>
                                    )}
                            </div>
                            <div className="form-group">
                                <label>Mot de passe</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text">{this.state.email}</div>
                                    </div>
                                    <input type="password" value={this.state.password}  className="form-control" />
                                </div>
                                <Keyboard onChange={this.onPwdChange} />
                            </div>
                            <button className="btn btn-primary">Connexion</button>
                        </form>
                         
                        
                    </div>
                </div>
            </div>
            
          );
    }
}
 
export default Login;
import React from 'react';
import {Redirect} from 'react-router-dom';
import api from '../apis/api';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

class Login extends React.Component{
    state = { id: '', email : '',password: '',nom: '', prenom: '', message: '', logged: false, personnes: []};

    componentDidMount() {
        if(localStorage.getItem('users')){
            let personnes = JSON.parse(localStorage.getItem('users'));
            this.setState({personnes});
        }else{
            this.users_refresh();
        }

    }

    users_refresh = () =>{
        api.get('../personnes').then(
            res => {
                let personnes = res.data;
                localStorage.setItem('users',JSON.stringify(personnes));
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
         
        event.preventDefault();
        let personnes = this.state.personnes.filter(p=>{return p.email==this.state.email && p.password==this.state.password})
        console.log(personnes);
        if(personnes.length){
            localStorage.setItem('user',JSON.stringify(personnes[0]));
            this.setState({logged:true});
        }else{
            this.setState({message:<div className="alert alert-danger">Erreur d'authentification</div>});
        }
        
    }
     
    render(){
        if(!localStorage.getItem('server')){
            return <Redirect to={'/server'} />
        }
            
        if(this.state.logged){
            return <Redirect to={'/commande/new'} />
        }
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
                                <button onClick={(event)=>{
                                    event.preventDefault();
                                    this.users_refresh();
                                    }
                                    } className="btn m-2 btn-dark" ><i className="fas fa-refresh"></i> Actualiser</button>
                                 
                                { this.state.personnes.map( p =>
                                    <button key={p.id} onClick={event => {
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
                                    <input type="password" onChange={(text)=>this.setState({password: text})} value={this.state.password}  className="form-control" />
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
import React from 'react';
import {Redirect} from 'react-router-dom';
import api from '../apis/api';
import md5 from 'md5';
import logo from './../logo.png'



class Login extends React.Component{
    state = {   id: '', email : '',password: '',nom: '', prenom: '',
                message: '',
                logged: false,
                personnes: [],
                loading: false
    };

    componentDidMount() {
        if(localStorage.getItem('users')){
            let personnes = JSON.parse(localStorage.getItem('users'));
            this.setState({personnes});
        }else{
            this.users_refresh();
        }
    }

    users_refresh = () =>{
        this.setState({loading:true});
        api.get('../personnes').then(
            res => {
                let personnes = res.data;
                localStorage.setItem('users',JSON.stringify(personnes));
                this.setState({personnes});
                this.setState({loading:false});
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
        let personnes = this.state.personnes.filter(p=>{return p.email==this.state.email && p.password==md5(this.state.password)})
        console.log(personnes);
        if(personnes.length){
            localStorage.setItem('user',JSON.stringify(personnes[0]));
            this.setState({logged:true});
        }else{
            this.setState({message:<div className="alert alert-danger"><strong>Erreur:</strong> Email ou mot de passe incorrect !</div>});
        }
        
    }

    setPassword = (value) =>{
        this.setState({password: this.state.password+value})
    }

    setPasswordBack = ()=>{
        let password = this.state.password;
        password = password.slice(0, -1);
        this.setState({password})
    }
     
    render(){
        if(!localStorage.getItem('server')){
            return <Redirect to={'/server'} />
        }
            
        if(this.state.logged){
            return <Redirect to={'/commande/new'} />
        }
        return (
             <div className="container p-5">
                <div className="text-center d-block m-2">
                <img src={logo}  style={{width:100}} />
                </div>
                <div className="card m-auto mt-4 w-lg-50">
                    <div className="card-header  " style={{backgroundColor: '#794530 !important'}}>
                        <h3> My <i>Café</i> 2020 <small>Authentification</small></h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onLogin}>
                            {this.state.message} 
                            <div className="form-group">
                                
                                 <button onClick={(event)=>{
                                    event.preventDefault();
                                    this.setState({personnes: []});
                                    this.users_refresh();
                                    }
                                    } className="btn   btn-dark" >
                                    <i class={this.state.loading?"fas fa-sync fa-spin":"fas fa-sync"}></i>  
                                </button>
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
                                <label>Email / Mot de passe</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text">{this.state.email}</div>
                                    </div>
                                    <input type="password" value={this.state.password}  className="form-control" />
                                </div>
                                 
                             </div>
                            
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPassword(1)}}>1</button> 
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPassword(2)}}>2</button> 
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPassword(3)}}>3</button>  
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPassword(4)}}>4</button> 
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPassword(5)}}>5</button> 
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPassword(6)}}>6</button> 
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPassword(7)}}>7</button> 
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPassword(8)}}>8</button> 
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPassword(9)}}>9</button> 
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPassword(0)}}>0</button> 
                            <button className="btn btn-info m-1" onClick={e=>{e.preventDefault();this.setPasswordBack()}}>C</button> 
                            <button className="btn btn-dark m-1">OK</button>
                            
                        </form>
                         
                        
                    </div>
                </div>
            </div>
            
          );
    }
}
 
export default Login;
import React from 'react';
import {Redirect} from 'react-router-dom';
import api from '../apis/api';

class Login extends React.Component{
    state = { token : '', email : '',password: '' , message: '', logged: false};

     
    onEmailChange = (event) => {
        this.setState({email : event.target.value})
    }

    onPwdChange = (event) => {
        this.setState({password : event.target.value})
    }

    onLogin = (event) => {
        event.preventDefault();
        let message = "Connexion en cours..";
        this.setState({ message }); 
        api.post('login_check',{"username":this.state.email,"password": this.state.password }).then(
        res => {
                const token = res.data.token;
                this.setState({ token: token });
                console.log(res);
                localStorage.setItem('token',this.state.token);
                message = this.state.token;
                this.setState({ message, logged: true }); 
        },
            err => {
                const message = err.message;
                this.setState({ message }); 
        })  
    }
     
    render(){
        if(this.state.logged) 
            return <Redirect to="/commande/new" />
        return (
             <div className="container">
                <div className="card m-3">
                    <div className="card-header  bg-primary text-white">
                        <h3> My <i>Café</i> 2020 <small>Authentification</small></h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onLogin}>
                            
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" onChange= {this.onEmailChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" onChange= {this.onPwdChange} className="form-control" />
                            </div>
                            <button className="btn btn-primary">Connexion</button>
                        </form>
                        <div class="alert">
                            {this.state.message} 
                        </div>
                        
                    </div>
                </div>
            </div>
            
          );
    }
}
 
export default Login;
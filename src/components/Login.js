import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
  

class Login extends React.Component{
    state = { token : '', email : '',password: '' , message: ''};

     
    onEmailChange = (event) => {
        this.setState({email : event.target.value})
    }

    onPwdChange = (event) => {
        this.setState({password : event.target.value})
    }

    onLogin = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/login_check',
            {"username":this.state.email,"password": this.state.password },
            {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(
            res => {
                const token = res.data.token;
                this.setState({ token: token });
                console.log(res);
                localStorage.setItem('token',this.state.token);
        },
            err => {
                const message = err.message;
                this.setState({ message }); 
        })  
    }
     
    render(){
         
        return (
             <div className="container">
                <div className="card m-3">
                    <div className="card-header  bg-primary text-white">
                        <h3> Connexion</h3>
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
                        {this.state.message} 
                    </div>
                </div>
            </div>
            
          );
    }
}
 
export default Login;
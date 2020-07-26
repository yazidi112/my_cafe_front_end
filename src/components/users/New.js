import React from 'react';
import { Link ,Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class userNew extends React.Component{
    state = { redirect: null,
              user : {email: null, password: null}  
            };

     
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.post('/users', this.state.user)
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
                <div className="m-3 text-right">
                    <Link className="btn btn-info pull-right" to="/users" >Utilisateurs</Link>
                </div>
                <div className="card m-3">
                    <div className="card-header bg-info text-white">
                        <h3 className="card-title">Ajouter une utilisateur</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onFormSubmit}>
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
           
          );
    }
}

export default userNew;  
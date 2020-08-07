import React from 'react';
import {Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class changePassword extends React.Component{
    state = { 
        user        : {id: null, password: null },
        redirect    : null,
        message     : ''
    };
     
    componentDidMount(){
        const { match: { params } } = this.props;
        let user    = this.state.user;
        user.id     = params.id;
        this.setState({ user });
     }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.setState({message:<div className="alert alert-warning">Modification en cours..</div> });
        api.put('/users/password/'+this.state.user.id,this.state.user)
            .then( res => {
                this.setState({message:<div className="alert alert-success">Modification effectuée..</div> });
            }, err => {
                this.setState({message:<div className="alert alert-danger"><strong>Erreur: </strong>Modification erronnée..</div> });
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
                        Modifier le mot de passe 
                    </div>
                    <div className="card-body">
                        {this.state.message}
                        <form onSubmit={this.onFormSubmit}>
                          
                            <div className="form-group">
                                <label>Nouveau Mot de passe</label>
                                <input type="text" value={this.state.user.password}  
                                    onChange={(event)=>{
                                    let user = this.state.user;
                                    user.password = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
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

export default changePassword;  
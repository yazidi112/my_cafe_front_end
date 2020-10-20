import React from 'react';
import {Redirect}  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class fournisseurEdit extends React.Component{
    state = { 
        user : {id: null, nom: null, prenom: null, email: null, adresse: null, tel: null },
        redirect : null
    };

    componentDidMount(){
        const { match: { params } } = this.props;
        console.log(this.props);
        api.get('/users/'+params.id)
            .then(res => {
                const user = res.data;
                this.setState({ user }); 
        }) 
     }
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.put('/users/'+this.state.user.id,this.state.user)
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
                         Modifier un utilisateur 
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                                <label>Nom</label>
                                <input type="text" value={this.state.user.nom} onChange={(event)=>{
                                    let user = this.state.user;
                                    user.nom = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Prénom</label>
                                <input type="text" value={this.state.user.prenom} onChange={(event)=>{
                                    let user = this.state.user;
                                    user.prenom = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Téléphone</label>
                                <input type="text" value={this.state.user.tel} onChange={(event)=>{
                                    let user = this.state.user;
                                    user.tel = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Adresse</label>
                                <input type="text" value={this.state.user.adresse} onChange={(event)=>{
                                    let user = this.state.user;
                                    user.adresse = event.target.value;
                                    this.setState({user})
                                }} className="form-control" />
                            </div>


                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" value={this.state.user.email} onChange={(event)=>{
                                    let user = this.state.user;
                                    user.email = event.target.value;
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

export default fournisseurEdit;  
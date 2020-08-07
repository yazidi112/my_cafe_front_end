import React from 'react';
import { Link }  from 'react-router-dom';
import api from '../../apis/api';
import Nav from '../Nav';

class user extends React.Component{
    state = { 
        users : [],
        message: ''
    };

    usersRefresh(){
        this.setState({message: <div className="alert alert-warning">Chargement en cours..</div>});
        api.get('/users')
            .then(res => {
                const users = res.data;
                this.setState({ users }); 
                this.setState({message: <div className="alert alert-success">Chargement terminé..</div>});
            },err=>{
                this.setState({message: <div className="alert alert-danger">Chargement echoué..</div>});
            }) 
    }

    componentDidMount(){
        this.usersRefresh();
    }
     
    onDelete = (id) => {
        if(!window.confirm("Etes-vous sûr de vouloir supprimer ?"))
            return false;
        this.setState({message: <div className="alert alert-warning">Suppression en cours..</div>});
        api.delete(`/users/${id}`).then(res => {
            this.setState({message: <div className="alert alert-success">Suppression effectué.</div>});
            this.usersRefresh();
        },err => {
            this.setState({message: <div className="alert alert-danger"><strong>Erreur: </strong>Suppression n'est pas effectué.</div>});
        })  
    }

     

     

    render(){
        return (
            <div>
                <Nav />
                <div className="container"> 
                    <div className="card m-3">
                        <div className="card-header bg-info text-white">
                            Liste des utilisateurs
                        </div>
                        <div className="card-body">
                        {this.state.message}
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nom et prénom</th>
                                        <th>Email</th>
                                        <th>Tél</th>
                                        <th>Admin</th>
                                        <th style={{width : 200}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.users.map(user => 
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.nom} {user.prenom} </td>
                                            <td>{user.email}</td>
                                            <td>{user.tel}</td>
                                            <td>{user.roles.indexOf("ROLE_ADMIN")>=0?'oui':'non'}</td>
                                            <td>
                                                {
                                                    user.roles.indexOf("ROLE_ADMIN")<0 &&
                                                    <a href="#"   className="btn btn-sm btn-danger  m-1 {user.roles.indexOf('ROLE_ADMIN')>=0?'disabled':''}" onClick={this.onDelete.bind(this,user.id)}>Supprimer</a>  
                                                }
                                                
                                                <Link className="btn btn-sm btn-success  m-1" to={`/users/edit/${user.id}`} >Modifier</Link> 
                                                <Link className="btn btn-sm btn-warning  m-1" to={`/users/edit/password/${user.id}`} >Mot de passe</Link> 
                                            </td>
                                        </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
          );
    }
}

export default user;  
import React from 'react';
import { Link }  from 'react-router-dom';
import api from '../../apis/api';
import Nav from '../Nav';

class user extends React.Component{
    state = { 
        users : [],
        userNewData: {title:'', price: ''},
        userEditData: {id:'', title:'', price: ''}
    };

    usersRefresh(){
        api.get('/users')
            .then(res => {
                const users = res.data;
                this.setState({ users }); 
        }) 
    }

    componentDidMount(){
        this.usersRefresh();
    }
     
    onDelete = (id) => {
        if(!window.confirm("Etes-vous sûr de vouloir supprimer ?"))
            return false;

        api.delete(`/users/${id}`).then(res => {
            console.log(res);
            this.usersRefresh();
        })  
    }

     

     

    render(){
        return (
            <div>
                <Nav />
                <div className="m-3 text-right">
                    <Link className="btn btn-info pull-right" to="/users/new" >Ajouter un utilisateur</Link>
                </div>
                <div className="card m-3">
                    <div className="card-header bg-info text-white">
                        <h3 className="card-title">Liste des utilisateurs</h3>
                    </div>
                    <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th style={{width : 200}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.users.map(user => 
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <a href="#"  className="btn btn-sm btn-danger  mr-3" onClick={this.onDelete.bind(this,user.id)}>Supprimer</a>  
                                        <Link className="btn btn-sm btn-success" to={`/users/edit/${user.id}`} >Modifier</Link> 
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            
          );
    }
}

export default user;  
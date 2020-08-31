import React from 'react';
import { Link }  from 'react-router-dom';
import api from '../../apis/api';
import Nav from '../Nav';

class categorie extends React.Component{
    state = { 
        categories : [],
        message: ''
    };

     
    componentDidMount(){
        
        this.categoriesRefresh();
    }

    categoriesRefresh(){
        this.setState({message: <div className="alert alert-warning">Chargement en cours..</div>});
        api.get('/categories')
            .then(res => {
                const categories = res.data;
                this.setState({ categories }); 
                this.setState({message:  ''});
            } ,err=>{
                this.setState({message: <div className="alert alert-danger">Chargement echoué..</div>});
            }) 
    }
     
    onDelete = (id) => {
        if(!window.confirm("Etes-vous sûr de vouloir supprimer ?"))
            return false;
        this.setState({message: <div className="alert alert-warning">Suppression en cours..</div>});
        api.delete(`/categories/${id}`).then(
            res => {
                this.setState({message: <div className="alert alert-success">Suppression effectué.</div>});
                this.categoriesRefresh();
            },
            err => {
                this.setState({message: <div className="alert alert-danger"><strong>Erreur: </strong>Suppression n'est pas effectué.</div>});
            }
            )  
    }

     

     

    render(){
        return (
            <div>
                <Nav />
                <div className="container">
                    <div className="card m-3">
                        <div className="card-header bg-info text-white">
                            Catégories 
                        </div>
                        <div className="card-body">
                        {this.state.message}
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Titre</th>
                                        <th style={{width : 200}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.categories.map(categorie => 
                                        <tr key={categorie.id}>
                                            <td><img src={localStorage.getItem('server')+'/../'+categorie.image} style={{width: '100px'}} /></td>
                                            <td>{categorie.title}</td>
                                            <td>
                                                <a href="#"  className="btn btn-sm btn-danger  mr-3" onClick={this.onDelete.bind(this,categorie.id)}>Supprimer</a>  
                                                <Link className="btn btn-sm btn-success" to={`/categories/edit/${categorie.id}`} >Modifier</Link> 
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

export default categorie;  
import React from 'react';
import { Link }  from 'react-router-dom';
import api from '../../apis/api';
import Nav from '../Nav';

class categorie extends React.Component{
    state = { 
        categories : [],
        artcileNewData: {title:'', price: ''},
        categorieEditData: {id:'', title:'', price: ''},
        modalEditDisplay: ''
    };

    categoriesRefresh(){
        api.get('/categories')
            .then(res => {
                const categories = res.data;
                this.setState({ categories }); 
        }) 
    }

    componentDidMount(){
        this.categoriesRefresh();
    }
     
    onDelete = (id) => {
        if(!window.confirm("Etes-vous sûr de vouloir supprimer ?"))
            return false;

        api.delete(`/categories/${id}`).then(res => {
            console.log(res);
            this.categoriesRefresh();
        })  
    }

     

     

    render(){
        return (
            <div>
                <Nav />
                <div className="m-3 text-right">
                    <Link className="btn btn-info pull-right" to="/categories/new" >Ajouter un categorie</Link>
                </div>
                <div className="card m-3">
                    <div className="card-header bg-info text-white">
                        <h3 className="card-title">Liste des categories</h3>
                    </div>
                    <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titre</th>
                                <th style={{width : 200}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.categories.map(categorie => 
                                <tr key={categorie.id}>
                                    <td>{categorie.id}</td>
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
            
          );
    }
}

export default categorie;  
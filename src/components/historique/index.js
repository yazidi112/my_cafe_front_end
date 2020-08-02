import React from 'react';
import api from '../../apis/api';
import Nav from '../Nav';

class commande extends React.Component{
    state = { 
        users           : [],
        commandes       : [],
        commande        : [],
        user            : JSON.parse(localStorage.getItem('user')),
        selecteduser  : null
    };

    onDateChange = (e) =>{
        let date = e.target.value.split("T")[0];
        api.get('/commandes?user='+this.state.selecteduser.id+'&date='+ date)
            .then(res => {
                const commandes = res.data;
                this.setState({ commandes }); 
        }) 
    }

    componentDidMount(){
        api.get('/users')
            .then(res => {
                this.setState({ users: res.data }); 
        }) 
    }
     
    onCommandeSelect(id){
        api.get('/lignecommandes?commande='+id)
            .then(res => {
                const commande = res.data;
                this.setState({ commande }); 
        }) 
    }
     

    render(){
        return (
            <div>
                <Nav />
                        <div className="row">
                            <div className="col">
                                <div className="card m-3">
                                    <div className="card-header bg-info text-white">
                                        Utilisateurs
                                    </div>
                                    <div className="card-body">
                                        {this.state.users.length==0 &&
                                            <p>Chargement des utilisateurs</p>
                                        }
                                        {this.state.users.map(u => {
                                            return <button className="btn btn-info m-1"
                                                onClick={e => {
                                                    this.setState({selecteduser: u})
                                                }}
                                            >{u.nom} {u.prenom}</button>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card m-3">
                                    <div className="card-header bg-info text-white">
                                        Commandes
                                    </div>
                                    <div className="card-body">
                                            <div className="form-group">
                                           <input type="date" onChange={this.onDateChange} className="form-control" />
                                            </div>
                                            {this.state.selecteduser &&
                                                <span>Utilisateur: {this.state.selecteduser.nom} {this.state.selecteduser.prenom}</span>
                                            }
                                            <div className="table-responsive" >
                                                <table className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Date de la commande</th>
                                                            <th style={{width: '100px'}}> </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        { this.state.commandes.map(commande => 
                                                            <tr key={commande.id}>
                                                                <td>{commande.id}</td>
                                                                <td>{commande.date}</td>
                                                                <td>
                                                                    <button className="btn btn-warning"
                                                                    onClick={this.onCommandeSelect.bind(this,commande.id)}>Afficher</button>
                                                                </td>
                                                            </tr>
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="col">
                                <div className="card m-3">
                                    <div className="card-header bg-info text-white">
                                        Détails de la commande
                                    </div>
                                    <div className="card-body">
                                                                                                   
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Article</th>
                                                            <th>Prix</th>
                                                            <th>Quantité</th>
                                                            <th>Montant</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        { this.state.commande.map((commande,index) => 
                                                            
                                                            <tr key={index}>
                                                                <td>{commande.article.title}</td>
                                                                <td>{commande.prix.toFixed(2)}</td>
                                                                <td>
                                                                    {commande.quantite} 
                                                                </td>
                                                                <td>
                                                                    {(commande.prix * commande.quantite).toFixed(2)}
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                    <tfoot  > 
                                                        <tr>
                                                            <th>TOTAL</th>
                                                            <th colSpan="4" className="text-right">
                                                                {(this.state.commande.reduce((a, b) => parseFloat(a) + parseFloat(b.prix*b.quantite), 0)).toFixed(2)}
                                                            </th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div> 
                                        </div>
                                    </div>
                                </div>       
                            </div>
                        </div>
                        
                
            
          );
    }
}

export default commande;  
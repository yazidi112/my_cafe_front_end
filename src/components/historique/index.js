import React from 'react';
import api from '../../apis/api';
import Nav from '../Nav';

class commande extends React.Component{
    state = { 
        users           : [],
        commandes       : [],
        commandesMessage: '',
        commande        : [],
        commandeMessage : '',
        user            : JSON.parse(localStorage.getItem('user')),
        selecteduser    : {id:''},
        credit          : 0,
        creditMessage   : '',
        date            : '',
    };

    onDateChange(user,date){
        
        this.setState({commandesMessage: <div className="alert alert-warning">Chargement en cours..</div>});
        api.get('/commandes?user='+user+'&date='+ date)
            .then(
                res => {
                const commandes = res.data;
                this.setState({ commandes })
                this.setState({commandesMessage: ''});; 
            },
            err =>{
                this.setState({commandesMessage: <div className="alert alert-danger"><strong>Erreur:</strong> Une erreur est survenue veuillez ressayer plus tard.</div>});; 
            }
        ) 
    }

    componentDidMount(){
        api.get('/users')
            .then(res => {
                this.setState({ users: res.data }); 
        }) 
    }
     
    onCommandeSelect(id){
        this.setState({commandeMessage: <div className="alert alert-warning">Chargement en cours..</div>});
        api.get('/lignecommandes?commande='+id)
            .then(res => {
                this.setState({commandeMessage: ''});
                const commande = res.data;
                this.setState({ commande }); 
            },
            err =>{
                this.setState({commandeMessage: <div className="alert alert-danger"><strong>Erreur: </strong> Une erreur est survenue! Veuillez ressayer plus tard.</div>});; 
            }) 
    }

    onCommandeAnnuler(id,etat){

        this.setState({commandesMessage: <div className="alert alert-warning">Oppération en cours..</div>});
        api.put('/commandes/'+id,{annulee: etat}).then(
            res => {
                this.setState({commandesMessage: <div className="alert alert-success">Oppération effectué.</div>});
                this.onDateChange(this.state.date);
            },
            err =>{
                this.setState({commandesMessage: <div className="alert alert-danger"><strong>Erreur: </strong> Une erreur est survenue! Veuillez ressayer plus tard.</div>});; 
            }
        )
    }


    getCredit(id){
        api.get('../commandes/no_rendu/'+id)
        .then(res => {
            let credit = (parseFloat(res.data.credit)).toFixed(2);
            this.setState({credit});
        }) 
    }

    onEncaisser(){
        this.setState({creditMessage: <div className="alert alert-warning">Encaissement en cours..</div>});
        let id = this.state.selecteduser.id;
        api.get('../commandes/rendu/'+id)
        .then(res => {
            this.setState({creditMessage: <div className="alert alert-success">Encaissement effectuée.</div>});
            console.log(res.data.message);
            this.getCredit(id);
        },
        err =>{
            this.setState({creditMessage: <div className="alert alert-danger"><strong>Erreur: </strong> Une erreur est survenue! Veuillez ressayer plus tard.</div>});; 
        })
    }
     

    render(){
        return (
            <div>
                <Nav />
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card m-3">
                                    
                                    <div className="card-body overflow-auto" style={{height:"290px"}}>
                                        <div><label  ><input   type="radio"  name="user"  
                                                onClick={e => {
                                                    this.setState({selecteduser: {id:''}});
                                                    this.setState({credit: 0.00});
                                                    this.onDateChange('',this.state.date);
                                                }}
                                            />   Tous les utilisateurs</label></div>
                                        {this.state.users.length===0 &&
                                            <small>Chargement des utilisateurs</small>
                                        }
                                        {this.state.users.map(u => {
                                            return <div>
                                                <label  > 
                                                    <input type="radio"  name="user"  
                                                    onClick={e => {
                                                        this.setState({selecteduser: u});
                                                        this.getCredit(u.id);
                                                        this.onDateChange(u.id,this.state.date);
                                                    }}
                                                />   {u.nom} {u.prenom}</label>
                                            </div>
                                        })}
                                        
                                           
                                        
                                    </div>
                                </div>
                                <div className="card m-3">
                                     
                                    <div className="card-body">
                                            {this.state.creditMessage}
                                            <div className="table-responsive" >
                                            <table className="table table-bordered mt-2">
                                                <thead>
                                                    <tr>
                                                        <th>Montant</th>
                                                        <th style={{width:'100px'}}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                       <td>
                                                            {this.state.credit} DH
                                                        </td>
                                                        <td>
                                                        {this.state.credit !== 0.00 && 
                                                            <button className="btn btn-sm btn-success" onClick={this.onEncaisser.bind(this)}>Encaisser</button>
                                                        }
                                                        {this.state.credit === 0.00 && 
                                                            <button className="btn btn-sm btn-success" disabled>Encaisser</button>
                                                        }
                                                        </td>  
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="card m-3">
                                     
                                    <div className="card-body">
                                            {this.state.commandesMessage}
                                            <div className="form-group">
                                            <input type="date" value={this.state.date} onChange={ e =>{
                                                let date = e.target.value.split("T")[0];
                                                this.setState({date});
                                                this.onDateChange(this.state.selecteduser.id,date);
                                               }} className="form-control" />
                                            </div>
                                             
                                                <div  className="small">
                                                    <span>Nombre de Commandes:</span> 
                                                    <span className="float-right"><strong>{this.state.commandes.length}</strong></span>
                                                </div>
                                                <div  className="small">
                                                    <span>Total Commandes:</span> 
                                                    <span className="float-right"><strong>
                                                        {(this.state.commandes.reduce((a, b) => parseFloat(a) + parseFloat(b.lignecommandes.reduce((x,y)=> parseFloat(x)+parseFloat(y.prix*y.quantite),0)),0)).toFixed(2)} DH
                                                    </strong></span>
                                                </div>
                                            <div className="table-responsive" style={{height:'300px'}}>
                                                <table className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Date</th>
                                                            <th>Total</th>
                                                            <th style={{width: '170px'}}> Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        { this.state.commandes.map(commande => 
                                                            <tr key={commande.id} className={commande.annulee?"bg-danger text-white":""}>
                                                                <td>{commande.id}</td>
                                                                <td>{commande.date.split("T")[0]} </td>
                                                                <td>{(commande.lignecommandes.reduce((a, b) => parseFloat(a) + parseFloat(b.prix*b.quantite), 0)).toFixed(2)} DH</td>
                                                                <td>
                                                                    <button className="btn btn-warning btn-sm mr-1"
                                                                        onClick={this.onCommandeSelect.bind(this,commande.id)}>Afficher</button>
                                                                    {commande.annulee && 
                                                                        <button className="btn btn-sm btn-success"
                                                                            onClick={this.onCommandeAnnuler.bind(this,commande.id,false)}>Valider</button>
                                                                    }

                                                                    {!commande.annulee && 
                                                                    <button className="btn btn-sm btn-danger"
                                                                        onClick={this.onCommandeAnnuler.bind(this,commande.id,true)}>Annuler</button>
                                                                    }
                                                                    
                                                                </td>
                                                            </tr>
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card m-3">
                                     
                                    <div className="card-body">
                                            {this.state.commandeMessage}                                                      
                                            <div className="table-responsive" style={{height:'350px'}}>
                                                <table className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Article</th>
                                                            <th>Prix</th>
                                                            <th>Qté</th>
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
                                                    
                                                </table>
                                            </div>
                                            <table className="table table-bordered"> 
                                                <tr>
                                                    <th>TOTAL</th>
                                                    <th colSpan="4" className="text-right">
                                                        {(this.state.commande.reduce((a, b) => parseFloat(a) + parseFloat(b.prix*b.quantite), 0)).toFixed(2)}
                                                    </th>
                                                </tr>
                                            </table> 
                                        </div>
                                    </div>
                                </div>       
                            </div>
                        </div>
                        
                
            
          );
    }
}

export default commande;  
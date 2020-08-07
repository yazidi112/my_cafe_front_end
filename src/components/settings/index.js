import React from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import api from '../../apis/api';
import Nav from '../Nav';

class Settings extends React.Component{
    state = { 
        settings : {printhead:null, printfoot:null} ,
        message  : ''
    };

     componentDidMount(){
        this.setState({message: <div className="alert alert-warning">Chargement en cours..</div>});
        api.get('/settings/'+1)
            .then(res => {
                const settings = res.data;
                this.setState({ settings }); 
                this.setState({message: <div className="alert alert-success">Chargement terminé.</div>});
            }, err => {
                this.setState({message: <div className="alert alert-danger">Chargement echoué.</div>});
            }) 
     }
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.put('/settings/1',this.state.settings)
            .then(res => {
                console.log(res);
                this.setState({redirect: true});
        })  
    }

    render(){
        
        return (
            <div>
                <Nav />
                <div  className="container">
                    <div className="card m-3">
                        <div className="card-header bg-info text-white">
                            <h3 className="card-title">Paramétres</h3>
                        </div>
                        <div className="card-body">
                            {this.state.message}
                            <form onSubmit={this.onFormSubmit}>
                                <h3>Ticket d'impression</h3>
                                
                                <div className="form-group">
                                    <label>Entête de page</label>
                                    <DefaultEditor   value={this.state.settings.printhead} onChange={(event)=>{
                                        let settings = this.state.settings;
                                        settings.printhead = event.target.value;
                                        this.setState({settings})}
                                        }/>
                                </div>
                                <div className="form-group">
                                    <label>Pied de page</label>
                                    <DefaultEditor   value={this.state.settings.printfoot} onChange={(event)=>{
                                        let settings = this.state.settings;
                                        settings.printfoot = event.target.value;
                                        this.setState({settings})}
                                        }/>
                                     
                                </div>
                                
                                <button className="btn btn-primary">Enregistrer les modifications</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}

export default Settings;  
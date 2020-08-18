import React from 'react';
import {  Link }  from 'react-router-dom'
 
class Server extends React.Component{
    state = { 
        server      : localStorage.getItem('server') ,
        message     : ''
    };

    
     
    onFormSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('server',this.state.server);
    }

    render(){
        
        return (
            <div>
                
                <div  className="container">
                    <div className="card m-3">
                        <div className="card-header bg-info text-white">
                            <h3 className="card-title">Paramétres de serveur</h3>
                        </div>
                        <div className="card-body">
                            {this.state.message}
                            <form onSubmit={this.onFormSubmit}>
                                 
                                <div className="form-group">
                                    <label>Adresse URL</label>
                                     <input type="text" className="form-control" value={this.state.server} 
                                        onChange={(e)=> this.setState({server: e.target.value})}
                                     />
                                </div>
                                 
                                
                                <button className="btn btn-primary mr-2">Enregistrer </button>

                                <Link className="btn btn-secondary " to="/" >Connexion</Link>
                                
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}

export default Server;  
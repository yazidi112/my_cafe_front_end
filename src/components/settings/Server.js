import React from 'react';
import {Redirect} from 'react-router-dom';
 
class Server extends React.Component{
    state = { 
        server      : localStorage.getItem('server') ,
        message     : '',
        redirect    : false
    };

    
     
    onFormSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('server',this.state.server);
        this.setState({message: <div className="alert alert-success">Adresse de serveur modifié.</div>});
        setTimeout(() => {
            this.setState({redirect: true})
        }, 1000);
    }

    render(){
        if(this.state.redirect)
            return <Redirect to="/" />
        return (
            <div>
                
                <div  className="container">
                    <div className="card m-3">
                        <div className="card-header bg-info text-white">
                            Paramétres de serveur
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

                                 
                                
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}

export default Server;  
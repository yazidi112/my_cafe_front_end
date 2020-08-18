import React from 'react';
 
class Server extends React.Component{
    state = { 
        server      : localStorage.getItem('server') ,
        message     : ''
    };

    
     
    onFormSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('server',this.state.server);
        this.setState({message: <div className="alert alert-success">Adresse de serveur modifié.</div>})
    }

    render(){
        
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
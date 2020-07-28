import React from 'react'
import {  Link }  from 'react-router-dom'
import user from './users/Liste';

class Nav extends React.Component{

     

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));        
        this.setState({email: user.email});
    }
    
    state = { username: ''};
   
    render(){
            return ( 
                 <div>
                    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
                        <a className="navbar-brand" href="#">My <i>Café</i> 2020 <br/><small style={{fontSize: '50%'}}>By Imran YAZIDI</small></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav justify-content-center mr-auto ">
                            </ul>
                            <span className="navbar-text">
                                {this.state.email} 
                                <Link className="btn btn-danger btn-sm ml-2" to="/logout" >Déconnexion</Link>
                            </span>
                        </div>
                    </nav>
                    <nav className="navbar navbar-expand-lg   fixed-bottom">
                      

                      <div className="collapse navbar-collapse" id="navbarSupportedContent2">
                          <ul className="navbar-nav justify-content-center mr-auto ">
                           
                             
                              <li className="nav-item">
                                <Link className="btn btn-info pull-right m-1 btn-sm" to="/commande/new" >Nouvelle Commande</Link>
                              </li>
                               <li className="nav-item">
                                <Link className="btn btn-info pull-right m-1 btn-sm" to="/commandes" >Mes Commandes</Link>
                              </li>
                          </ul>
                            <span className="navbar-text">
                                <Link className="btn btn-primary pull-right m-1 btn-sm" to="/categories" >Historique</Link>
                                <Link className="btn btn-primary pull-right m-1 btn-sm" to="/categories" >Catégories</Link>
                                <Link className="btn btn-primary pull-right m-1 btn-sm" to="/articles" >Articles</Link>
                                <Link className="btn btn-primary pull-right m-1 btn-sm" to="/users" >Utilisateurs</Link>
                                <Link className="btn btn-primary pull-right m-1 btn-sm" to="/articles" >Paramètres</Link>
                            </span>
                      </div>
                  </nav>
                </div>    
             
            );
        }
}

export default Nav;
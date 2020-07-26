import React from 'react'
import {  Link }  from 'react-router-dom'
import user from './users/Liste';

class Nav extends React.Component{

     

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        this.setState({username: user.username});
    }
    
    state = { username: ''};
   
    render(){
            return ( 
                 
                    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark justify-content-center">
                        <a className="navbar-brand" href="#">My <i>Café</i> 2020 <br/><small style={{fontSize: '50%'}}>By Imran YAZIDI</small></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav justify-content-center mr-auto ">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/commande/new">Commande</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/categories" >Historique</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/categories" >Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/articles" >Articles</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users" >Utilisateurs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/articles" >Paramètres</Link>
                                </li>
                            </ul>
                            <span className="navbar-text">
                                {this.state.username} 
                                <Link className="btn btn-danger ml-2" to="/logout" >Déconnexion</Link>
                            </span>
                        </div>
                    </nav>
             
            );
        }
}

export default Nav;
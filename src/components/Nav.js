import React from 'react'
import { BrowserRouter ,Link }  from 'react-router-dom'

class Nav extends React.Component{
   
    render(){
            return ( 
                <BrowserRouter>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">My <i>Café</i></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Commande</Link>
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
                                    <Link className="nav-link" to="/articles" >Utilisateurs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/articles" >Paramètres</Link>
                                </li>
                            </ul>
                            <span className="navbar-text">
                                <Link className="btn btn-danger" to="/logout" >Déconnexion</Link>
                            </span>
                        </div>
                    </nav>
            </BrowserRouter>
            );
        }
}

export default Nav;
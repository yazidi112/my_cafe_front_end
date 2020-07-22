import React from 'react'
import { BrowserRouter ,Link }  from 'react-router-dom'

class Nav extends React.Component{
   
    render(){
            return ( 
                <BrowserRouter>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Nav</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/categories" >Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/articles" >Articles</Link>
                                </li>
                            </ul>
                            <span className="navbar-text">
                                <Link className="nav-link" to="/login" >Déconnexion</Link>
                            </span>
                        </div>
                    </nav>
            </BrowserRouter>
            );
        }
}

export default Nav;
import React from 'react'
import { Route,Switch,BrowserRouter}  from 'react-router-dom'

import ArticleListe from './article/Liste'
import ArticleNew from './article/New'
import ArticleEdit from './article/Edit'
import CategoryListe from './category/Liste'
import CategoryNew from './category/New'
import CategoryEdit from './category/Edit'
import CommandeNew from './commande/New'
import CommandeListe from './commande/Liste'
import UserListe from './users/Liste'
import UserNew from './users/New'
import UserEdit from './users/Edit'
import ChangePassword from './users/changePassword'
import Settings from './settings'
import Historique from './historique'
import Login from './Login'
import Logout from './Logout'
 

class Home extends React.Component{
   
    render(){
            return (
               <div>
                   <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component ={Login} />
                            <Route path="/commande/new"   component ={CommandeNew} />
                            <Route path="/commandes"   component ={CommandeListe} />
                            <Route path="/categories"   component ={CategoryListe} />
                            <Route path="/categories/new"   component ={CategoryNew} />
                            <Route path="/categories/edit/:id"   component ={CategoryEdit} />
                            <Route path="/articles"  component ={ArticleListe} />
                            <Route path="/articles/new"  component ={ArticleNew} />
                            <Route path="/articles/edit/:id"  component ={ArticleEdit} />
                            <Route path="/users"  component ={UserListe} />
                            <Route path="/users/new"  component ={UserNew} />
                            <Route path="/users/edit/:id"  component ={UserEdit} />
                            <Route path="/settings"  component ={Settings} />
                            <Route path="/historique"  component ={Historique} />
                            <Route path="/users/edit/password/:id"  component ={ChangePassword} />
                            <Route path="/login"  component ={Login} />
                            <Route path="/logout"  component ={Logout} />
                        </Switch>
                    </BrowserRouter>
                </div>
            )
    }
}

export default Home;

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
import Server from './settings/Server'
 

class Home extends React.Component{
   
    render(){
            return (
               <div>
                   <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component ={Login} />
                            <Route exact path="/server" component ={Server} />
                            <Route path="/commande/new" exact  component ={CommandeNew} />
                            <Route path="/commandes"  exact component ={CommandeListe} />
                            <Route path="/categories"  exact component ={CategoryListe} />
                            <Route path="/categories/new" exact  component ={CategoryNew} />
                            <Route path="/categories/edit/:id" exact  component ={CategoryEdit} />
                            <Route path="/articles" exact component ={ArticleListe} />
                            <Route path="/articles/new" exact component ={ArticleNew} />
                            <Route path="/articles/edit/:id" exact  component ={ArticleEdit} />
                            <Route path="/users" exact component ={UserListe} />
                            <Route path="/users/new" exact component ={UserNew} />
                            <Route path="/users/edit/:id" exact component ={UserEdit} />
                            <Route path="/settings" exact component ={Settings} />
                            <Route path="/historique" exact component ={Historique} />
                            <Route path="/users/edit/password/:id" exact  component ={ChangePassword} />
                            <Route path="/logout" exact component ={Logout} />
                        </Switch>
                    </BrowserRouter>
                </div>
            )
    }
}

export default Home;

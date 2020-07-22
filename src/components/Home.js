import React from 'react'
import { BrowserRouter, Route, Link }  from 'react-router-dom'

import ArticleListe from './article/Liste'
import ArticleNew from './article/New'
import ArticleEdit from './article/Edit'
import CategoryListe from './category/Liste'
import CategoryNew from './category/New'
import Login from './Login'
 

class Home extends React.Component{
   
    render(){
        if(!localStorage.getItem('token'))
            return <Login />
        else
            return (
                <BrowserRouter>
                    <Route path="/categories" exact component ={CategoryListe} />
                    <Route path="/categories/new" exact component ={CategoryNew} />
                    <Route path="/articles" exact component ={ArticleListe} />
                    <Route path="/articles/new" exact component ={ArticleNew} />
                    <Route path="/articles/edit/:id" exact component ={ArticleEdit} />
                    <Route path="/login" exact component ={Login} />
                </BrowserRouter>
            )
    }
}

export default Home;
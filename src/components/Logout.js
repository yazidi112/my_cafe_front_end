import React from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends React.Component{
    
    constructor(){
        super();
        localStorage.clear();
    }

     
     
    render(){
        return <Redirect to="/login" /> 
    }
}
 
export default Logout;
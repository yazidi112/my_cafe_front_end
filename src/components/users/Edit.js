import React from 'react';
import { Link, Redirect }  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class userNew extends React.Component{
    state = { 
        data : {id: '', email : null  },
        redirect : null
    };

     componentDidMount(){
        const { match: { params } } = this.props;
        console.log(this.props);
        api.get('/users/'+params.id)
            .then(res => {
                const data = res.data;
                this.setState({ data }); 
        }) 
     }
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.put('/users/'+this.state.data.id,this.state.data)
            .then(res => {
                console.log(res);
                this.setState({redirect: true});
        })  
    }

    render(){
        if(this.state.redirect)
            return <Redirect to="/users" />
        return (
            <div>
                 <Nav />
                <div className="m-3 text-right">
                    <Link className="btn btn-info pull-right" to="/users" >utilisateurs</Link>
                </div>
                <div className="card m-3">
                    <div className="card-header bg-info text-white">
                        <h3 className="card-title">Modifier un utilisateur</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" value={this.state.data.email} onChange={(event)=>{
                                    let data = this.state.data;
                                    data.email = event.target.value;
                                    this.setState({data})}
                                    } className="form-control" />
                            </div>
                             
                            <button className="btn btn-primary">Modifier</button>
                        </form>
                         
                    </div>
                </div>
            </div>
          );
    }
}

export default userNew;  
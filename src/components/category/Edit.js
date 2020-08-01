import React from 'react';
import { Link, Redirect }  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class CategoryNew extends React.Component{
    state = { 
        data : {id: '', title : null  },
        redirect : null
    };

     componentDidMount(){
        const { match: { params } } = this.props;
        console.log(this.props);
        api.get('/categories/'+params.id)
            .then(res => {
                const data = res.data;
                this.setState({ data }); 
        }) 
     }
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.put('/categories/'+this.state.data.id,this.state.data)
            .then(res => {
                console.log(res);
                this.setState({redirect: true});
        })  
    }

    render(){
        if(this.state.redirect)
            return <Redirect to="/categories" />
        return (
            <div>
                <Nav />
                <div className="container"> 
                    <div className="card m-3">
                        <div className="card-header bg-info text-white">
                            <h3 className="card-title">Modifier un Catégorie</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <label>Titre</label>
                                    <input type="text" value={this.state.data.title} onChange={(event)=>{
                                        let data = this.state.data;
                                        data.title = event.target.value;
                                        this.setState({data})}
                                        } className="form-control" />
                                </div>
                                
                                <button className="btn btn-primary">Modifier</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}

export default CategoryNew;  
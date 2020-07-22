import React from 'react';
import { Link, Redirect }  from 'react-router-dom'
import api from '../../apis/api';
import Nav from '../Nav';

class ArticleNew extends React.Component{
    state = { 
        data : {id: '', title : null, price: null }
    };

     componentDidMount(){
        const { match: { params } } = this.props;
        console.log(this.props);
        api.get('/articles/'+params.id)
            .then(res => {
                const data = res.data;
                this.setState({ data }); 
        }) 
     }
     
    onFormSubmit = (event) => {
        event.preventDefault();
        api.put('/articles/'+this.state.data.id,this.state.data)
            .then(res => {
                console.log(res);
                return <Redirect to="/articles" />
        })  
    }

    render(){
        return (
            <div>
                 <Nav />
                <div className="m-3 text-right">
                    <Link className="btn btn-info pull-right" to="/articles" >Articles</Link>
                </div>
                <div className="card m-3">
                    <div className="card-header bg-info text-white">
                        <h3 className="card-title">Modifier un article</h3>
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
                            <div className="form-group">
                                <label>Prix</label>
                                <input type="text" value={this.state.data.price} onChange={(event)=>{
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
          );
    }
}

export default ArticleNew;  
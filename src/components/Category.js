import React from 'react'

class Category extends React.Component{
   

    constructor(props){
        super(props);
        this.state = { c: 0};
    }
     
    componentDidMount(){
        setInterval( ()=>{
             this.setState({c:  this.state.c + 1});
        },1000);
    }
    render(){
        return <h1>{this.state.c}: Hello im category componenet {this.props.name} </h1>
    }
}

export default Category;
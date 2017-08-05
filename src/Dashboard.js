import React, { Component } from 'react';

class Dashboard extends Component{
    render(){
        // console.log("avg ",this.props.data);
        return(
            <h3>User Average Score : {this.props.data}</h3>
        )
    }
}

export default Dashboard;
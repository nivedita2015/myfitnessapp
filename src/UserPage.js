import React, { Component } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import Dashboard from './Dashboard';
import axios from 'axios';

class UserBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [],avg:0 };
        this.loadUsersFromServer = this.loadUsersFromServer.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
    }

    loadUsersFromServer(){
        axios.get(this.props.url)
            .then(res => {
                this.setState({data: res.data.userlist,avg:res.data.avg});
            })
    }

    handleUserSubmit(user){
        console.log("inside handle user submit");
        let userlist = this.state.data;
        let avg = this.state.avg;
        user._id = Date.now();
        axios.post('http://localhost:3001/api/getScore',user)
            .then(res => {
                console.log("res data ",res.data);
                user.score = res.data.score;
                user.status = res.data.status;
                console.log("post ",user);
                axios.post(this.props.url,user)
                    .catch(err => {
                        console.error(err);
                        this.setState({data:userlist,avg:avg});
                    });
            })
            .catch(err =>{
                console.error(err);
            });
    }

    componentDidMount(){
        this.loadUsersFromServer();
        setInterval(this.loadUsersFromServer,this.props.pollInterval);
    }

    render() {
        return (
            <div className="container">
                <UserForm onUserSubmit = {this.handleUserSubmit} />
                <div className="container">
                    <Dashboard data={ this.state.avg } />
                    <h2>User List:</h2>
                    <UserList data={ this.state.data }/>
                </div>
            </div>
        )
    }
}

export default UserBox;
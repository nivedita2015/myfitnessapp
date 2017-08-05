import React, { Component } from 'react';

class UserForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            age: '',
            gender: 'F',
            pushups: '',
            situps: '',
            score: 0,
            status: 'Fail'
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handlePushupsChange = this.handlePushupsChange.bind(this);
        this.handleSitupsChange = this.handleSitupsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(e){
        this.setState({user: e.target.value});
    }
    handleAgeChange(e){
        this.setState({age: e.target.value});
    }
    handleGenderChange(e){
        this.setState({gender: e.target.value});
    }
    handlePushupsChange(e){
        this.setState({pushups: e.target.value});
    }
    handleSitupsChange(e){
        this.setState({situps: e.target.value});
    }
    handleSubmit(e){
        console.log("inside handle submit");
        e.preventDefault();
        let user = this.state.user.trim();
        let age = this.state.age;
        let gender = this.state.gender;
        let pushups = this.state.pushups;
        let situps = this.state.situps;

        let error = '';
        if(!user) {
            error = error.concat('Enter username \n');
        }
        if(!age) {
            error = error.concat('Enter age \n');
        }
        if(age<17) {
            error = error.concat("Please enter age over 17 \n");
        }
        if(isNaN(age)) {
            error = error.concat("Please enter Numeric value (17+) for age \n")
        }
        if(!pushups && !situps)
            error = error.concat("Please enter pushups or situps \n");
        if(pushups && isNaN(pushups))
            error = error.concat("Please enter Numeric value for pushups \n")
        if(situps && isNaN(situps))
            error = error.concat("Please enter Numeric value for situps \n")


        if(error) {
            console.log("found an error")
            alert(error);
            return;
        }
        else {
            this.props.onUserSubmit({
                user: user,
                age: age,
                gender: gender,
                pushups: pushups,
                situps: situps
            });
        }

        this.setState({
            user: '',
            age: '',
            gender: 'F',
            pushups: '',
            situps: '',
            score: 0,
            status: 'Fail'
        });
    }

    render(){
        return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" >My Fitness App</a>
                    <form className="navbar-form navbar-left" onSubmit={ this.handleSubmit }>
                        <div className="form-group">
                            <input
                                type='text'
                                className="form-control"
                                placeholder='Username'
                                value={ this.state.user }
                                onChange={ this.handleUserChange } />
                            <input
                                type='text'
                                className="form-control"
                                placeholder='Age'
                                value={ this.state.age }
                                onChange={ this.handleAgeChange } />
                            <select className="form-control" value={this.state.gender} onChange = { this.handleGenderChange }>
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                            </select>
                            <input
                                type='text'
                                className="form-control"
                                placeholder='Push Ups'
                                value={ this.state.pushups }
                                onChange={ this.handlePushupsChange } />
                            <input
                                type='text'
                                className="form-control"
                                placeholder='Sit Ups'
                                value={ this.state.situps }
                                onChange={ this.handleSitupsChange } />
                            <button type="submit" className="btn btn-default" value="Post">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>

        )
    }
}

export default UserForm;
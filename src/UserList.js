import React, { Component } from 'react';
import User from './User';

class UserList extends Component {
    render() {
        // console.log(this.props.data);
        let UserNodes = this.props.data.map(user => {
            // console.log(user);
            return (
                <User user={ user.user } key={ user['_id'] }>
                    {user.user}{user.age}{user.gender}{user.pushups}{user.situps}{user.score}{user.status}
                </User>
            )
        });
        return (
            <div>
                <table className="table table-bordered table-responsive table-condensed">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Pushups</th>
                        <th>Situps</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    { UserNodes }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserList;
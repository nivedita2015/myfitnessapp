import React, { Component } from 'react';

class User extends Component {

    render() {
        // console.log(this.props.children);

        let UserInfo = this.props.children.map((child,i) => {
            // console.log(child);
           return (
               <td key = {i}>{ child }</td>
           )
        });
        return (
                <tr>
                    { UserInfo }
                </tr>

        )
    }
}

export default User;
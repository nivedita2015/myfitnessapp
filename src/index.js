import React from 'react';
import ReactDOM from 'react-dom';
import UserPage from './UserPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <UserPage
        url = 'http://localhost:3001/api/users'
        pollInterval={2000}/>,
    document.getElementById('root')
);
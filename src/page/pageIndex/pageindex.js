import React from 'react';
import {
    Link
} from 'react-router-dom'
import './index.scss'
class Home extends React.Component {
    render(){
        return (
            <ul id="page">
                <li><Link to="/">APP</Link></li>
                <li><Link to="/shopCart">shopCart</Link></li>
            </ul>
        )
    }
}

export default Home

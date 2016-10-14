import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar-main navbar navbar-dark navbar-full bg-inverse">
                    <a className="navbar-brand"> Web</a>
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/"><i className="fa fa-home"></i> Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/helsinki"><i className="fa fa-bar-chart"></i>Helsinki</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks"><i className="fa fa-info-circle"></i>Tasks</Link>
                    </li>
                </ul>
                <ul className="nav navbar-nav pull-right nav-login">
                    <li className="nav-item active">
                        <span className="nav-link"><AccountsUIWrapper /></span>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default createContainer(() => {
    return {
    };
}, Navbar);

import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar-main navbar navbar-dark navbar-full bg-inverse">

                <a className="navbar-brand"><span><img src="onenote-logo-32x32.png" /></span> Web</a>
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link"><i className="fa fa-home"></i> Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><i className="fa fa-bar-chart"></i> Stats</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><i className="fa fa-info-circle"></i> About</a>
                    </li>
                </ul>
                <ul className="nav navbar-nav pull-right">
                    <li className="nav-item active">
                        <span className="nav-link"></span>
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

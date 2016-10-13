import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Navbar from './Navbar.jsx';

// App component - represents the whole app
class App extends Component {

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    return {
    };
}, App);

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Navbar from '../components/Navbar.jsx';

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
/* http://stackoverflow.com/questions/37333860/what-does-createcontainer-in-meteor-using-react-do*/
/* A component created with createContainer is a simple wrapper around your actual component,
   but it's powerful in that it handles Meteor's reactivity for you so you don't have to think
   about how to keep your everything up to date when your data changes (e.g. a subscription loads, ReactiveVar / Session var changes)*/
export default createContainer(() => {
    return {
    };
}, App);

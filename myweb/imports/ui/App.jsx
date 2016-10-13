import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Navbar from './Navbar.jsx';
import Helsinki from './Helsinki.jsx';

// App component - represents the whole app
class App extends Component {
    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }
    renderNavbar() {
        return <Navbar />
    }

    renderHelsinki (){
        return <Helsinki />
    }

    render() {
        return (
            <div>
                <div>{this.renderNavbar()}</div>
                <div className="container">
                    {/* <div className="card">
                        <div className="card-title">
                        <h1>Todo List</h1>
                        </div>
                        <div className="card-text">
                        <ul> {this.renderTasks()} </ul>
                        </div>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div> */}
                        {/* {this.renderHelsinki()} */}
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

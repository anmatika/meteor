import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { TaskItems } from '../../api/tasks.js';
import Task from '../components/Task.jsx';

// App component - represents the whole app
class Tasks extends Component {
    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div>
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                    <input
                    type="text"
                    ref="textInput"
                    placeholder="Type to add new tasks"
                    />
                    <button type="submit" >Submit</button>
                </form>
                <ul className="tasks list-group">{this.renderTasks()} </ul>
            </div>
        );
    }
    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('tasks.insert', text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }
}

Tasks.propTypes = {
    tasks: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    return {
        /* tasks: TaskItems.find({}).fetch()*/
        tasks: TaskItems.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user()
    };
}, Tasks);

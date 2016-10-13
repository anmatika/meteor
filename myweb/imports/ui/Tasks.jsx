import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { TaskItems } from '../api/tasks.js';
import Task from './Task.jsx';

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
                <ul>{this.renderTasks()} </ul>
            </div>
        );
    }
}

Tasks.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        tasks: TaskItems.find({}).fetch(),
    };
}, Tasks);

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class FrontPage extends Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    render() {
        return (
            <div className="row">
                <h1>Front page </h1>
            </div>
        );
    }
}
export default createContainer(() => {
    return {};
}, FrontPage);

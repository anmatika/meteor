import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

let Heart = require('react-icons/lib/fa/heart');
class FrontPage extends Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    render() {
        return (
            <div className="row">
                <h1> The front page </h1>
                <div className="col-xs-12">
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    return {};
}, FrontPage);

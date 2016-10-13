import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import axios from 'axios';
import service from './OpenDataService.jsx';

class Helsinki extends Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    getData(){
        var that = this;
        service.prototype.getData()
            .then((response) => {
                console.log(response);
                that.setState({ data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentDidMount() {
        console.log('component did mount hit');
        this.getData();
    }
    renderData() {
        return this.state.data.map((d) => (
            <div key={d.id} className="col-sm-4">
                <div className="card card-block">
                    <div className="card-title">
                        <strong> {d.title}</strong>
                    </div>
                    <div className="card-text">
                        {d.description_short}
                    </div>
                </div>
            </div>
        ));
    }
    render() {
        return (
            <div className="row">
                {this.renderData()}
            </div>
        );
    }
}
export default createContainer(() => {
    return {};
}, Helsinki);

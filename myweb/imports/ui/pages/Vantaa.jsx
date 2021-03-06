import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import openDataService from '../OpenDataService';

class Vantaa extends Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    getData(){
        var that = this;
        openDataService.getVantaaOpenVacancies()
            .then((response) => {
                console.log(response);
                that.setState({ data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentDidMount() {
        this.getData();
    }
    renderData() {
        return this.state.data.map((d) => (
            <div key={d.id} className="col-sm-6">
                <div className="card card-block">
                    <div className="card-title">
                        <strong> {d.tyotehtava}</strong>
                    </div>
                    <div className="card-text">
                        <ul className="list-group">
                            <li className="list-group-item">{d.ammattiala}</li>
                            <li className="list-group-item">{d.organisaatio}</li>
                            <li className="list-group-item">{d.osoite}</li>
                            <li className="list-group-item">{d.haku_paattyy_pvm}</li>
                            <li className="list-group-item"><a rel="external" href={d.linkki}>{ d.linkki }</a></li>
                        </ul>
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
}, Vantaa);

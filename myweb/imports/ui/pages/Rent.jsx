import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import rentsWatchService from '../RentsWatchService.js';

class Rent extends Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    getData(){
        var that = this;
        rentsWatchService.prototype.getCitiesRankingByAveragePrices()
            .then((response) => {
                console.log(response);
                that.setState({ data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    getDetails(cityName) {
        var that = this;
        rentsWatchService.prototype.getCityDetails(cityName)
            .then((response) => {
                console.log(response);
                that.setState({ cityDetails: response.data[0] });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentDidMount() {
        this.getData();
    }
    renderData() {
        let cities = this.state.data.map((d) => {
            let cityName = d[0];
            return <div key={d[0]} className="card card-block">
                        <div className="card-title" onClick={this.getDetails.bind(this, cityName)}>
                            <strong>{cityName}</strong>
                            {/* <strong> { cityName }</strong> */}
                        </div>
                        <div className="card-text">
                            <ul className="list-group">
                                <li className="list-group-item">{d[1]} EUR/square meter</li>
                            </ul>
                        </div>
                   </div>;
        });

        return (<div>{cities}</div>);
    }
    render() {
        return (

            <div className="row">
                <div className="col-sm-12">
                    <div className="card card-block">
                        <ul className="list-group">
                            <li className="list-group-item">{ this.state.cityDetails != null ? 'name: ' + this.state.cityDetails.name : '' }</li>
                            <li className="list-group-item"> { this.state.cityDetails != null ? 'avg. price: ' + this.state.cityDetails.avgPricePerSqm : '' }</li>
                            <li className="list-group-item"> { this.state.cityDetails != null ? this.state.cityDetails.latitude : '' }</li>
                            <li className="list-group-item"> { this.state.cityDetails != null ? this.state.cityDetails.longitude : '' }</li>
                            <li className="list-group-item"> { this.state.cityDetails != null ? new Date(this.state.cityDetails.lastSnapshot * 1000).toString() : '' }</li>
                        </ul>
                        {/* <iframe
                            width="600"
                            height="450"
                            frameBorder="0" style="border:0"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBfGt6YPMgyIJGJTGJaYsAnCO8iO9G9N9o
                            &q=Space+Needle,Seattle+WA" allowfullscreen>
                            </iframe> */}
                    </div>
                    {this.renderData()}
                </div>
            </div>
        );
    }
}
export default createContainer(() => {
    return {};
}, Rent);

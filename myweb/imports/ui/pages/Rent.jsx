import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import rentsWatchService from '../RentsWatchService.js';
import GoogleMap from '../components/GoogleMaps.jsx';
/* import FaBeer from 'react-icons/fa/beer';*/
let Money = require('react-icons/lib/fa/money');

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
        $('#modal').modal('show');
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
            return <div key={d[0]} className="card card-block city" onClick={this.getDetails.bind(this, cityName)}>
                        <div className="card-title">
                            <div className="city__name">
                                <Money />&nbsp;
                                <strong>{cityName}</strong>
                            </div>
                        </div>
                        <div className="card-text">
                            <ul className="list-group">
                                <li className="list-group-item">Price per sqm: {d[1].toFixed(2)} EUR</li>
                            </ul>
                        </div>
                   </div>;
        });

        return (<div>{cities}</div>);
    }
    renderGoogleMaps() {

        if(this.state.cityDetails == null) {
            return (<div></div>);
        }
        let latlon = this.state.cityDetails != null ? this.state.cityDetails.latitude + "," + this.state.cityDetails.longitude : '';
        let src = "https://www.google.com/maps/embed/v1/view?key=AIzaSyBfGt6YPMgyIJGJTGJaYsAnCO8iO9G9N9o&zoom=8&center=" + latlon;

        return (<GoogleMap iframe='iframe' src={src} height="400" width="95%" frameBorder="0" />);
    }

    renderCityDetails() {
        let name, avgprice, total, inequalityIndex, radius, latitude, longitude, lastSnapshot;
        if (this.state.cityDetails != null) {
            name = this.state.cityDetails.name;
            avgprice = this.state.cityDetails.avgPricePerSqm;
            total = this.state.cityDetails.total;
            inequalityIndex = this.state.cityDetails.inequalityIndex;
            radius = this.state.cityDetails.radius;
            latitude = this.state.cityDetails.latitude;
            longitude = this.state.cityDetails.longitude;
            lastSnapshot = new Date(this.state.cityDetails.lastSnapshot * 1000).toString();
        }
        return (
            <div id="modal" className="modal hide fade clearfix">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header clearfix">
                            <strong>{name}</strong></div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-6">
                                        {this.renderGoogleMaps()}
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="card card-block">
                                            <div className="card-title"><strong>{name}</strong></div>
                                            <div className="card-text">
                                                <ul className="list-group">
                                                    <li className="list-group-item"> { 'avg price per sqm: ' + avgprice }</li>
                                                    <li className="list-group-item"> { 'total: ' + total }</li>
                                                    <li className="list-group-item"> { 'inequality index: ' + inequalityIndex}</li>
                                                    <li className="list-group-item"> { 'radius: ' + radius }</li>
                                                    <li className="list-group-item"> { 'lat: ' + latitude }</li>
                                                    <li className="list-group-item"> { 'lon: ' + longitude }</li>
                                                    <li className="list-group-item"> { 'last snapshot: ' + lastSnapshot }</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return(
            <div className="row">
                {this.renderCityDetails()}
                <div className="col-sm-12">
                    {this.renderData()}
                </div>
            </div>
        );
    }
}
export default createContainer(() => {
    return {};
}, Rent);

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import rentsWatchService from '../RentsWatchService.js';
import GoogleMap from '../components/GoogleMaps.jsx';

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
            return <div key={d[0]} className="card card-block">
                        <div className="card-title" onClick={this.getDetails.bind(this, cityName)}>
                            <strong>{cityName}</strong>
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
        if (this.state.cityDetails == null) {
            return (<div></div>);
        }
        return (
            <div id="modal" className="modal fade clearfix">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <strong>{this.state.cityDetails.name}</strong></div>
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
                                            <div className="card-title"><strong>{this.state.cityDetails.name}</strong></div>
                                            <div className="card-text">
                                                <ul className="list-group">
                                                    <li className="list-group-item"> { 'avg price per sqm: ' + this.state.cityDetails.avgPricePerSqm.toFixed(2) + ' EUR' }</li>
                                                    <li className="list-group-item"> { 'total: ' + this.state.cityDetails.total }</li>
                                                    <li className="list-group-item"> { 'inequality index: ' + this.state.cityDetails.inequalityIndex.toFixed(2) }</li>
                                                    <li className="list-group-item"> { 'radius: ' + this.state.cityDetails.radius }</li>
                                                    <li className="list-group-item"> { 'lat: ' + this.state.cityDetails.latitude }</li>
                                                    <li className="list-group-item"> { 'lon: ' + this.state.cityDetails.longitude }</li>
                                                    <li className="list-group-item"> { 'last snapshot: ' + new Date(this.state.cityDetails.lastSnapshot * 1000) }</li>
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

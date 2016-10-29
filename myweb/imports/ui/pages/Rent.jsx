/* global $ */
import React, { Component } from 'react';
import axios from 'axios';
import { createContainer } from 'meteor/react-meteor-data';
import rentsWatchService from '../RentsWatchService.js';
import GoogleMapIFrame from '../components/GoogleMapIFrame.jsx';
import GMap from '../components/Gmap.jsx';
import constants from '../services/constants.js';

const Home = require('react-icons/lib/fa/home');

const apiKey = 'AIzaSyBfGt6YPMgyIJGJTGJaYsAnCO8iO9G9N9o';

class Rent extends Component {
  constructor() {
    super();
    this.state = { citiesByAvgPrice: [], cities: [] };
    this.getCities();
  }

  componentDidMount() {
    this.getCitiesRankingByAvereagePrices();
  }

  getCitiesRankingByAvereagePrices() {
    const that = this;
    rentsWatchService.getCitiesRankingByAveragePrices()
            .then((response) => {
              console.log(response);
              that.setState({ citiesByAvgPrice: response.data });
            })
            .catch((error) => {
              console.log(error);
            });
  }

  getDetails(cityName) {
    $('#modal').modal('show');
    const that = this;
    rentsWatchService.getCityDetails(cityName)
            .then((response) => {
              console.log(response);
              that.setState({ cityDetails: response.data[0] });
            })
            .catch((error) => {
              console.log(error);
            });
  }


  getCities() {
    const that = this;

    rentsWatchService.getCities(3)
            .then(axios.spread((a, b, c) => {
              const cities = [...a.data, ...b.data, ...c.data];
              that.setState({ cities });
            }))
            .catch((error) => {
              console.log(error);
            });
  }
  renderData() {
    const citiesByAvgPrice = this.state.citiesByAvgPrice.map((d) => {
      const cityName = d[0];
      return (<div key={d[0]} className="card card-block city" onClick={this.getDetails.bind(this, cityName)}>
        <div className="card-title">
          <div className="city__name">
            <Home />&nbsp;
            <strong>{cityName}</strong>
          </div>
        </div>
        <div className="card-text">
          <ul className="list-group">
            <li className="list-group-item">Price per sqm: {d[1].toFixed(2)} EUR</li>
          </ul>
        </div>
      </div>);
    });
    return (<div>{citiesByAvgPrice}</div>);
  }

  renderGoogleMaps() {
    if (this.state.cityDetails == null) {
      return (<div />);
    }
    const latlon = this.state.cityDetails != null ? `${this.state.cityDetails.latitude},${this.state.cityDetails.longitude}` : '';
    const src = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&zoom=8&center=${latlon}`;

    return (<GoogleMapIFrame iframe="iframe" src={src} height="400" width="95%" frameBorder="0" />);
  }

  renderCityDetails() {
    let name,
      avgprice,
      total,
      inequalityIndex,
      radius,
      latitude,
      longitude,
      lastSnapshot;
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
                          <li className="list-group-item"> { `total: ${total}` }</li>
                          <li className="list-group-item"> { `inequality index: ${inequalityIndex}`}</li>
                          <li className="list-group-item"> { `radius: ${radius}` }</li>
                          <li className="list-group-item"> { `lat: ${latitude}` }</li>
                          <li className="list-group-item"> { `lon: ${longitude}` }</li>
                          <li className="list-group-item"> { `last snapshot: ${lastSnapshot}` }</li>
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

  renderMap() {
    if (this.state.cities.length === 0) {
      return (<div />);
    }
    return (<GMap initialCenter={constants.berlinLocation} cities={this.state.cities} />);
  }

  render() {
    return (
      <div className="row">
        { this.renderCityDetails()}
        <div className="col-sm-12">
          { this.renderMap() }
        </div>
        <div className="col-sm-12">
          { this.renderData() }
        </div>
      </div>
    );
  }
}

export default createContainer(() =>
     ({})
, Rent);

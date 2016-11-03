/* globals google, $ */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class GMap extends Component {
    constructor() {
        super();
        this.state = {
            zoom: 5,
        };
    }
    render() {
        return (<div className="GMap" >
            <div className="GMap-canvas" ref="mapCanvas" />
        </div>);
    }

    componentDidMount() {
        $.getScript('https://www.google.com/jsapi', () => {
            google.load('maps', '3', { other_params: 'sensor=false',
                callback: () => {
                    this.init();
                } });
        });
    }

    init() {
        // create the map, marker and infoWindow after the component has
        // been rendered because we need to manipulate the DOM for Google =(
        this.map = this.createMap();

        this.markers = this.createMarkers();
        this.circles = this.createCircles();

        // have to define google maps event listeners here too
        // because we can't add listeners on the map until its created
        google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange());
    }

    // clean up event listeners when component unmounts
    componentDidUnMount() {
        google.maps.event.clearListeners(this.map, 'zoom_changed');
    }


    createMap() {
        const mapOptions = {
            zoom: this.state.zoom,
            center: this.mapCenter(),
        };
        return new google.maps.Map(this.refs.mapCanvas, mapOptions);
    }

    mapCenter() {
        return new google.maps.LatLng(
            this.props.initialCenter.lat,
            this.props.initialCenter.lng
        );
    }

    createCircles() {
        const circles = [];
        this.props.cities.forEach((city) => {
            const opts = {
                center: { lat: city.latitude, lng: city.longitude },
                radius: city.radius,
                color: this.getCircleColor(city),
            };

            const circle = this.createCircle(opts);
            /* this.createInfoWindowForMarker(circle, city);*/
            circles.push(circle);
        });
        return circles;
    }

    getCircleColor(city) {
        if (city.avgPricePerSqm < 10) {
            return {
                fillColor: '#00cc00',
                strokeColor: '#00cc00',
            };
        } else if (city.avgPricePerSqm >= 10 && city.avgPricePerSqm < 15) {
            return {
                fillColor: '#ffcc66',
                strokeColor: '#ffcc66',
            };
        }

        return {
            fillColor: '#FF0000',
            strokeColor: '#FF0000',
        };
    }

    createCircle(opts) {
        return new google.maps.Circle({
            strokeColor: opts.color.strokeColor,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: opts.color.fillColor,
            fillOpacity: 0.35,
            map: this.map,
            center: opts.center,
            radius: opts.radius * 1000,
        });
    }

    createMarkers() {
        const markers = [];
        this.props.cities.forEach((city) => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(city.latitude, city.longitude),
                map: this.map,
            });
            this.createInfoWindowForMarker(marker, city);
            markers.push(marker);
        });

        return markers;
    }

    createInfoWindowForMarker(marker, city) {
        const infowindow = new google.maps.InfoWindow();
        const contentString = `<div class="card">
                                <div class="card-block">
                                    <h4 class="card-title">${city.name}</h4>
                                    <p class="card-text"></p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Price per sqm: ${city.avgPricePerSqm.toFixed(2)} EUR</li>
                                </ul>
                                <div class="card-block">
                                    <a href="#" class="card-link">Card link</a>
                                </div>
                            </div>`;

        google.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.setContent(contentString);
            infowindow.open(this.map, marker);
        });

        google.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close();
        });
    }

    handleZoomChange() {
        this.setState({
            zoom: this.map.getZoom(),
        });
    }
}

GMap.propTypes = {
    initialCenter: PropTypes.objectOf(PropTypes.number).isRequired,
    cities: PropTypes.objectOf(PropTypes.array).isRequired,
};
export default createContainer(() =>
     ({
     })
, GMap);

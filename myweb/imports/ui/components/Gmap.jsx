import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
class GMap extends Component {
    constructor(){
        super();
        this.state = {
            zoom: 4
        };
    }
    render() {
        return <div className="GMap" >
                    <div className='GMap-canvas' ref="mapCanvas"></div>
               </div>
    }

    componentDidMount() {
        $.getScript('https://www.google.com/jsapi', ()=>
        {
            google.load('maps', '3', { other_params: 'sensor=false', callback: ()=>
            {
                this.init();
            }});
        });
    }

    init(){

        // create the map, marker and infoWindow after the component has
        // been rendered because we need to manipulate the DOM for Google =(
        this.map = this.createMap()

        this.markers = this.createMarkers()
        this.createCircles();
        this.infoWindow = this.createInfoWindow()

        // have to define google maps event listeners here too
        // because we can't add listeners on the map until its created
        google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange())
    }

    // clean up event listeners when component unmounts
    componentDidUnMount() {
        google.maps.event.clearListeners(map, 'zoom_changed')
    }


    createMap() {
        let mapOptions = {
            zoom: this.state.zoom,
            center: this.mapCenter()
        }
        return new google.maps.Map(this.refs.mapCanvas, mapOptions)
    }

    mapCenter() {
        return new google.maps.LatLng(
            this.props.initialCenter.lat,
            this.props.initialCenter.lng
        )
    }

    createCircles(){
        this.props.cities.forEach(city => {
            let opts = {
                center: { lat: city.latitude, lng: city.longitude},
                radius: city.radius
            };

            this.createCircle(opts);
        });
    }

    createCircle(opts) {

        new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                center: opts.center,
                radius: opts.radius * 1000
            });
     }

    createMarkers() {
        let markers = [];
        var infowindow = new google.maps.InfoWindow();
        this.props.cities.forEach(city => {
                let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(city.latitude, city.longitude),
                        map: this.map,
                    })
                let contentString = `<div class="card">
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

                google.maps.event.addListener(marker, 'mouseover', function() {
                    infowindow.setContent(contentString);
                    infowindow.open(this.map, marker);
                });

                google.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });
                markers.push(marker);
            })

        return markers;
    }

    createInfoWindow(marker) {
        return new google.maps.InfoWindow({
            map: this.map,
            anchor: marker,
            content: marker != null ? marker.title : ''
        })
    }

    handleZoomChange() {
        this.setState({
            zoom: this.map.getZoom()
        })
    }
}

GMap.propTypes = {
    initialCenter: PropTypes.objectOf(PropTypes.number).isRequired
}
export default createContainer(() => {
    return {
    };
}, GMap);

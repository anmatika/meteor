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
                    <div className='UpdatedText'>
                        <p>Current Zoom: {this.state.zoom}</p>
                    </div>
                    <div className='GMap-canvas' ref="mapCanvas"></div>
               </div>
    }

    componentDidMount() {
        // create the map, marker and infoWindow after the component has
        // been rendered because we need to manipulate the DOM for Google =(
        this.map = this.createMap()
        this.marker = this.createMarkers()[0]
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

    createMarkers() {

        this.props.cities.forEach(city => {
            return new google.maps.Marker({
                    position: new google.maps.LatLng(city.latitude, city.longitude),
                    map: this.map,
                    title: city.name
                })
            })
    }

    createInfoWindow() {
        let contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
        return new google.maps.InfoWindow({
            map: this.map,
            anchor: this.marker,
            content: contentString
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

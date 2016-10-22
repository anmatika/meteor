import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class GoogleMapIFrame extends Component {

    render() {
        var Iframe = this.props.iframe;

        return(
            <div>
            <Iframe src={this.props.src} height={this.props.height} width={this.props.width} style={{border:0}} frameBorder={this.props.frameborder}/>
            </div>
        );
    }
}

export default createContainer(() => {
    return {
    };
}, GoogleMapIFrame);

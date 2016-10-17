import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class GoogleMap extends Component {

    render() {
        var Iframe = this.props.iframe;

        return(
            <div>
            <Iframe src={this.props.src} height={this.props.height} width={this.props.width}/>
            </div>
        )
    }
}

export default createContainer(() => {
    return {
    };
}, GoogleMap);

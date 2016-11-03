import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class GoogleMapIFrame extends Component {

    render() {
        const Iframe = this.props.iframe;

        return (
            <div>
                <Iframe src={this.props.src} height={this.props.height} width={this.props.width} style={{ border: 0 }} frameBorder={this.props.frameborder} />
            </div>
        );
    }
}

GoogleMapIFrame.propTypes = {
    iframe: PropTypes.objectOf(PropTypes.object).isRequired,
    height: PropTypes.objectOf(PropTypes.number).isRequired,
    width: PropTypes.objectOf(PropTypes.number).isRequired,
    src: PropTypes.objectOf(PropTypes.string).isRequired,
    frameborder: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default createContainer(() =>
     ({
     })
, GoogleMapIFrame);

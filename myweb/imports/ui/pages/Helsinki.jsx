import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import openDataService from '../OpenDataService';

class Helsinki extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  componentDidMount() {
    console.log('component did mount hit');
    this.getData();
  }
  getData() {
    const that = this;
    openDataService.getHelsinkiPalvelurekisteri()
            .then((response) => {
              console.log(response);
              that.setState({ data: response.data });
            })
            .catch((error) => {
              console.log(error);
            });
  }
  renderData() {
    return this.state.data.map(d => (
      <div key={d.id} className="col-sm-4">
        <div className="card card-block">
          <div className="card-title">
            <strong> {d.title}</strong>
          </div>
          <div className="card-text">
            {d.description_short}
          </div>
        </div>
      </div>
        ));
  }
  render() {
    return (
      <div className="row">
        {this.renderData()}
      </div>
    );
  }
}
export default createContainer(() =>
     ({})
, Helsinki);


import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import axios from 'axios';

// App component - represents the whole app
class Helsinki extends Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    getData (){
        let that = this;

        axios.get('http://www.hel.fi/palvelukarttaws/rest/vpalvelurekisteri/description/')
            .then(function (response) {
                console.log(response.data);
                that.setState({data: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount() {
       console.log('component did mount hit');
       this.getData();
    }
    renderData (){
        console.log('render data');
        return this.state.data.map((d)=> (<li key={d.id}>{d.title}</li>));
        /* this.state.data.forEach((d)=> {return console.log(d.title);});*/
        /* return ( <li></li> );*/
    }
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-title">
                        <h1>Helsinki List</h1>
                    </div>
                    <div className="card-text">
                        <ul> {this.renderData()} </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default createContainer(() => {
    return {};
}, Helsinki);

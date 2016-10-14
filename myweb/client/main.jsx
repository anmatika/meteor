import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'bootstrap/scss/bootstrap.scss';
import 'tether';
import 'bootstrap';
import { renderRoutes } from '../imports/startup/client/routes.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});

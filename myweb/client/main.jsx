import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import 'bootstrap/scss/bootstrap.scss';
import 'tether'
import 'bootstrap'
import App from '../imports/ui/App.jsx';
import Tasks from '../imports/ui/Tasks.jsx';
import { renderRoutes } from '../imports/startup/client/routes.jsx';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});

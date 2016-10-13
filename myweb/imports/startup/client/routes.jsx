import React from 'react';
import {
  Router,
  Route,
  browserHistory
} from 'react-router';

// route components
import App from '../../ui/App.jsx';
import NotFoundPage from '../../ui/notFoundPage.jsx';
import Helsinki from '../../ui/Helsinki.jsx';
import Tasks from '../../ui/Tasks.jsx';

export const renderRoutes = () => (
<Router history={browserHistory}>
    <Route path="/" component={App} >
        <Route path="helsinki" component={Helsinki}/>
        <Route path="tasks" component={Tasks}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
</Router>
);

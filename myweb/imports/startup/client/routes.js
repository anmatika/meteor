import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';

// route components
import App from '../../ui/containers/App.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import Helsinki from '../../ui/pages/Helsinki.jsx';
import Vantaa from '../../ui/pages/Vantaa.jsx';
import Tasks from '../../ui/pages/Tasks.jsx';
import FrontPage from '../../ui/pages/FrontPage.jsx';

export const renderRoutes = () => (
<Router history={browserHistory}>
    <Route path="/" component={App} >
        <IndexRoute component={FrontPage} />
        <Route path="helsinki" component={Helsinki}/>
        <Route path="vantaa" component={Vantaa}/>
        <Route path="tasks" component={Tasks}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
</Router>
);

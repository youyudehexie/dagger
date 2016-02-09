import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Workplace from './containers/Workplace';
import Writer from './containers/Writer';
import Settings from './containers/Settings';
import Home from './containers/Home';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="writer" component={Writer} />
    <Route path="workplace/:id" component={Workplace} />
    <Route path="settings/:id" component={Settings} />

  </Route>
);


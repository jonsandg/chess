"use strict";

// Accept hot module reloading
if (module.hot) {
  module.hot.decline('./routes.js');
  module.hot.accept();
}

import './styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import routes from './routes';

render((
    <Router history={browserHistory} routes={routes} />
), document.getElementById('app'));

/*
<Route path="/" component={App}>
      <IndexRoute component={Test}/>
    </Route>
    */
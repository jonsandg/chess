import App from 'containers/App';
import StartPage from 'containers/StartPage';
import Profile from 'containers/Profile';
import Game from 'containers/Game';

import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import tree from 'state';

const AppWrapper = (props) => {
  return (<App tree={tree} {...props} />);
};

const routes = {
  path: '/',
  component: AppWrapper,
  indexRoute: {component: StartPage},
  childRoutes: [
    { path: '/profile/:username', component: Profile },
    { path: '/game/:gameID', component: Game },
  ]
};
          
export default routes;
  

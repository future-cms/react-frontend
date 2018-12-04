import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import NotFound from './not-found';

//const Homepage = Loadable({
//  loader: () => import(/* webpackChunkName: "homepage" */ './homepage'),
//  loading: () => null,
//  modules: ['homepage']
//});


const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './profile'),
  loading: () => null,
  modules: ['profile']
});

const PageContainer = Loadable({
  loader: () => import(/* webpackChunkName: "page" */ './pageContainer'),
  loading: () => null,
  modules: ['pageContainer']
});

export default () => (
  <Switch>
    <Route exact path="/" component={PageContainer} />

    <Route exact path="/:path" component={PageContainer} />

    <Route exact path="/profile/:id" component={Profile} />
    
    <Route status={404} component={NotFound} />
  </Switch>
);

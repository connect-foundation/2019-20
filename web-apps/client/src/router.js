import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/main/index';
import Filters from './pages/filters';
import Location from './pages/area/index';

const link = {
  home: '/',
  category: '/category',
  location: '/location'
}

export default () => {
  return (
    <>
      <Route exact path={link.home} component={Home} />
      <Route exact path={link.category} component={Filters} />
      <Route exact path={link.location} component={Location} />
    </>
  );
};

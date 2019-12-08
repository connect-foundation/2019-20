import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Home from './pages/main';
import Category from './pages/category';
import Location from './pages/area';
import Navigator from './pages/navigator';
import './style.css';

const link = {
  home: '/',
  category: '/category',
  location: '/location'
}

export default () => {
  return (
    <Grid container style={({ margin: '0px 0px 5rem 0px' })}>
      <Route exact path={link.home} component={Home} />
      <Route exact path={link.category} component={Category} />
      <Route exact path={link.location} component={Location} />
      <Navigator />
    </Grid>
  );
};

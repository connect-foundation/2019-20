import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/main';
import Category from './pages/category';
import Location from './pages/area';


export default () => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/category" component={Category} />
      <Route exact path="/findMyLocation" component={Location} />
    </>
  );
};

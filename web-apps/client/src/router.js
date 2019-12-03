import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/main';
import Category from './pages/category';


export default () => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/category" component={Category} />
    </>
  );
};

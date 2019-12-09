import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { FilterProvider } from './contexts/filters';
import { SnackbarProvider } from './contexts/snackbar';
import Navigator from './pages/navigator';
import NoticeBar from './pages/notice';
import Router from './router';
import './style.css';

export default () => {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <FilterProvider>
          <Grid container style={({ margin: '0 0 5rem 0' })}>
            <Router />
            <Navigator />
          </Grid>
          <NoticeBar />
        </FilterProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import { FilterProvider } from './contexts/filters';
import { SnackbarProvider } from './contexts/snackbar';

import Navigator from './pages/navigator';
import NoticeBar from './pages/notice';
import Router from './router';

import theme from './theme';
import './style.css';

const useStyles = makeStyles({
  root: {
    margin: '0 0 5rem 0',
  }
});

export default () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <FilterProvider>
          <ThemeProvider theme={theme}>
            <Grid container className={classes.root}>
              <Router />
              <Navigator />
            </Grid>
            <NoticeBar />
          </ThemeProvider>
        </FilterProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { FilterProvider } from './contexts/filters';
import { SnackbarProvider } from './contexts/snackbar';
import Navigator from './pages/navigator';
import NoticeBar from './pages/notice';
import Router from './router';
import './style.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f4690b',
    },
    secondary: {
      main: '#97989a',
    }
  }
});

export default () => {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <FilterProvider>
          <ThemeProvider theme={theme}>
            <Grid container style={({ margin: '0 0 5rem 0' })}>
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

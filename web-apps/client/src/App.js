import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

// pages
import {ThemeProvider, makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import TmpChat from './pages/TmpChat';
import ChatRoom from './pages/ChatRoom';
import Main from './pages/main';
import Entrance from './pages/entrance';
import Filters from './pages/filters';
import Location from './pages/area';
import NewProduct from './pages/newProduct';

import {FilterProvider} from './contexts/filters';
import {SnackbarProvider} from './contexts/snackbar';

import Navigator from './pages/navigator';
import NoticeBar from './pages/notice';

import muiTheme from './theme/muiTheme';
import theme from './theme';

import './style.css';

const useStyles = makeStyles({
  root: {
    margin: '0 0 5rem 0',
  },
});

export default () => {
  const classes = useStyles({});
  return (
    <SnackbarProvider>
      <FilterProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Entrance} />
            <Grid container className={classes.root}>
              <ThemeProvider theme={theme}>
                <Route exact path='/main' component={Main} />
                <Route exact path='/category' component={Filters} />
                <Route exact path='/location' component={Location} />
              </ThemeProvider>
              <ThemeProvider theme={muiTheme}>
                <Route exact path='/chat' component={TmpChat} />
                <Route path='/chat/room/:id' Component={ChatRoom} />
              </ThemeProvider>
              <Route exact path='/write' component={NewProduct} />
              <ThemeProvider theme={theme}>
                <Navigator />
                <NoticeBar />
              </ThemeProvider>
            </Grid>
          </Switch>
        </Router>
      </FilterProvider>
    </SnackbarProvider>
  );
};

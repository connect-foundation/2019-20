import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// pages
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TmpChat from './pages/TmpChat';
import ChatRoom from './pages/ChatRoom';
import Home from './pages/main';
import Filters from './pages/filters';
import Location from './pages/area';
import NewProduct from './pages/newProduct';
import MyArticle from './pages/my-article-list';
import Mypage from './pages/mypage';

import ListView from './components/list-view';
import { getBuyListById, getInterestProductById } from './service/product';

import { FilterProvider } from './contexts/filters';
import { SnackbarProvider } from './contexts/snackbar';
import { UserProvider } from './contexts/user';

import Navigator from './pages/navigator';
import NoticeBar from './pages/notice';

import muiTheme from './theme/muiTheme';
import theme from './theme';

import './style.css';

const useStyles = makeStyles({
  root: {
    margin: '0 0 5rem 0',
  }
});

export default () => {
  const classes = useStyles({});
  return (
    <UserProvider>
      <SnackbarProvider>
        <FilterProvider>
          <Router>
            <Switch>
              <Grid container className={classes.root}>
                <ThemeProvider theme={theme}>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/category' component={Filters} />
                  <Route exact path='/location' component={Location} />
                  <Route exact path='/info' component={Mypage} />
                  <Route exact path='/my-article' component={MyArticle} />
                  <Route exact path='/buy-list'>
                    <ListView title='구매 내역' getProducts={getBuyListById} />
                  </Route>
                  <Route exact path='/favorite-list'>
                    <ListView title='찜한 내역' getProducts={getInterestProductById} />
                  </Route>
                </ThemeProvider>
                <ThemeProvider theme={muiTheme}>
                  <Route exact path='/chat' component={TmpChat} />
                  <Route path='/chat/room/:id' Component={ChatRoom} />
                </ThemeProvider>
                <Route exact path='/write' component={NewProduct} />
              </Grid>
            </Switch>
            <ThemeProvider theme={theme}>
              <Navigator />
              <NoticeBar />
            </ThemeProvider>
          </Router>
        </FilterProvider>
      </SnackbarProvider>
    </UserProvider>
  );
};

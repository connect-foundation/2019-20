import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

// pages
import {ThemeProvider, makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import TmpChat from './pages/TmpChat';
import ChatRoom from './pages/ChatRoom';
import Main from './pages/main';
import Entrance from './pages/Entrance';
import Filters from './pages/filters';
import Location from './pages/Area';
import WriteProduct from './pages/WriteProduct';
// TODO
// import MyArticle from './pages/my-article-list';
// import Mypage from './pages/mypage';
import SetMyArea from './pages/SetMyArea';
import ProductDetail from './pages/ProductDetail';

// TODO
// import ListView from './components/list-view';
// import { getBuyListById, getInterestProductById } from './service/product';

import {FilterProvider} from './contexts/Filters';
import {SnackbarProvider} from './contexts/SnackBar';
import UserStore from './contexts/User';
import AlertMessageStore from './contexts/AlertMessage';
import Image from './contexts/Image';

import Navigator from './pages/Navigator';
import NoticeBar from './pages/SnackBarBuilder';

import muiTheme from './theme/muiTheme';
import theme from './theme';

import './style.css';
import AlertDialog from './components/AlertDialog';

const useStyles = makeStyles({
  root: {
    margin: '0',
  },
});

export default () => {
  const classes = useStyles({});

  return (
    <AlertMessageStore>
      <UserStore>
        <SnackbarProvider>
          <FilterProvider>
            <Image>
              <Router>
                <Switch>
                  <Route exact path='/' component={Entrance} />
                  <Route exact path='/enrollLocation' component={SetMyArea} />
                  <Route exact path='/write' component={WriteProduct} />
                  <Route path='/product/:id' component={ProductDetail} />

                  <Grid container className={classes.root}>
                    <Route path='/service'>
                      <ThemeProvider theme={theme}>
                        <Route exact path='/service/main' component={Main} />
                        <Route
                          exact
                          path='/service/category'
                          component={Filters}
                        />
                        <Route
                          exact
                          path='/service/location'
                          component={Location}
                        />
                      </ThemeProvider>
                      <ThemeProvider theme={muiTheme}>
                        <Route exact path='/service/chat' component={TmpChat} />
                        <Route
                          exact
                          path='/service/chat/room/:id'
                          Component={ChatRoom}
                        />
                      </ThemeProvider>
                      <ThemeProvider theme={theme}>
                        <Navigator />
                        <NoticeBar />
                      </ThemeProvider>
                    </Route>
                  </Grid>
                </Switch>
                <AlertDialog />
              </Router>
            </Image>
          </FilterProvider>
        </SnackbarProvider>
      </UserStore>
    </AlertMessageStore>
  );
};

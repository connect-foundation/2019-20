import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import {ThemeProvider, makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import TmpChat from './pages/TmpChat';
import ChatRoom from './pages/ChatRoom';
import Main from './pages/Main';
import Entrance from './pages/Entrance';
import Filters from './pages/filters';
import Location from './pages/Area';
import WriteProduct from './pages/WriteProduct';

import MyArticle from './pages/ArticleList';
import Mypage from './pages/MyPage';
import SetMyArea from './pages/SetMyArea';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import EditProduct from './pages/EditProduct';

import ListView from './components/ListView';
import AlertDialog from './components/AlertDialog';

import {getBuyListById, getInterestProductById} from './service/product';

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

import {ROUTES, VIEW_WITH_NVAIGATOR} from './assets/uris';

const useStyles = makeStyles({
  root: {
    padding: '0 0 2.5rem 0',
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
                  <Route exact path={ROUTES.INDEX} component={Entrance} />
                  <Route
                    exact
                    path={ROUTES.ENROLL_LOCATION}
                    component={SetMyArea}
                  />
                  <Route exact path={ROUTES.WRITE} component={WriteProduct} />
                  <Route path={ROUTES.PRODUCT_INFO} component={ProductDetail} />
                  <Route path={ROUTES.EDIT} component={EditProduct} />
                  <Route path={VIEW_WITH_NVAIGATOR}>
                    <Grid container className={classes.root}>
                      <ThemeProvider theme={theme}>
                        <Route exact path={ROUTES.MYPAGE} component={Mypage} />
                        <Route exact path={ROUTES.MAIN} component={Main} />
                        <Route exact path={ROUTES.FILTER} component={Filters} />
                        <Route
                          exact
                          path={ROUTES.LOCATION_FILTER}
                          component={Location}
                        />
                        <Route exact path={ROUTES.SEARCH} component={Search} />
                        <Route exact path={ROUTES.BUY_LIST}>
                          <ListView
                            getProducts={getBuyListById}
                            title='구매내역'
                          />
                        </Route>
                        <Route
                          exact
                          path={ROUTES.SELL_LIST}
                          component={MyArticle}
                        />
                        <Route exact path={ROUTES.FAVORITE_LIST}>
                          <ListView
                            getProducts={getInterestProductById}
                            title='관심목록'
                          />
                        </Route>
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
                    </Grid>
                  </Route>
                </Switch>
              </Router>
            </Image>
          </FilterProvider>
        </SnackbarProvider>
      </UserStore>
      <AlertDialog />
    </AlertMessageStore>
  );
};

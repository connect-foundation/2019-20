import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import './index.css';
import App from './App';
import muiTheme from './theme/muiTheme';
import * as serviceWorker from './serviceWorker';
import rootReducer from './modules';

const logger = createLogger();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, ReduxThunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();

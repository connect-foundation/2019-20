import React from 'react';
import ReactDOM from 'react-dom';
// style
import {ThemeProvider} from '@material-ui/core/styles';
import './index.css';
// redux
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import App from './App';
import rootReducer from './modules';
import muiTheme from './theme/muiTheme';

const logger = createLogger();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, ReduxThunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();

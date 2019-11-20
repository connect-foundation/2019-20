import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import './index.css';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './modules';

const logger = createLogger();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, ReduxThunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();

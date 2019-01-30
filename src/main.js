import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './app';
import Reducers from './reducers';
import './styles.css';

const store = createStore(Reducers);

window.store = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './app';
import './styles.css';

render((
  <App />
), document.getElementById('container'));

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import './index.scss';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './containers/store';
import { ACCESS_TOKEN, TOKEN_TYPE } from './helpers/constants';

const store = configureStore();

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `${TOKEN_TYPE} ${localStorage.getItem(ACCESS_TOKEN)}`;
    return config;
});

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

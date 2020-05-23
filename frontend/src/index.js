import React from "react"
import ReactDOM from "react-dom"

import axios from 'axios';

import "./index.css"
import App from "./app/App"
import * as serviceWorker from "./serviceWorker"
import configureStore from "./app/store";
import {ACCESS_TOKEN} from "./constants";

const store = configureStore();

/* eslint-disable no-undef */
/* eslint-disable quotes */
// const XSRFToken = document.querySelector('meta[name="csrf-token"]');
// axios.defaults.headers.common['X-XSRF-TOKEN'] = XSRFToken.content;
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem(ACCESS_TOKEN);
    return config;
});

ReactDOM.render(<App store={store}/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

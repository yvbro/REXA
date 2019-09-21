import React, {Component} from 'react';

import {Provider} from 'react-redux';
import configureStore from './store';
import {ToastContainer} from "react-toastify";

import './App.css';
import logo from '../assets/logo.svg'

const store = configureStore();

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <ToastContainer autoClose={5000} />
            <h3>REXA: Reporting Xnat App</h3>
            <img src={logo} className="redux-logo" alt="logo" />
        </Provider>
    );
  }
}

export default App;

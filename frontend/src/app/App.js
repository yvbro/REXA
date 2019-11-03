import React from 'react';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import DashboardPage from '../dashboard/DashboardPage';
import Header from './Header';
import AppLayout from './AppLayout';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ToastContainer autoClose={5000} />
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/dashboard" component={() => <AppLayout><DashboardPage /></AppLayout>} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;

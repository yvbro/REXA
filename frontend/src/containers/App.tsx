import React, { useEffect } from 'react';

import { Provider, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import DashboardPage from '../components/dashboard/page/DashboardPage';
import NavBar from './NavBar';
import ProjectPage from '../components/project/page/ProjectPage';
import SettingsDetailsPage from '../components/settings/page/SettingsDetailsPage';
import UsersManagementPage from '../components/management/page/UsersManagementPage';
import LoginPage from '../components/auth/page/LoginPage';
import Logout from '../components/auth/smart/Logout';
import PrivateRoute from './PrivateRoute';
import LoadingIndicator from '../components/common/LoadingIndicator';
import NotFound from '../components/common/NotFound';
import OAuth2RedirectHandler from '../components/auth/smart/OAuth2RedirectHandler';
import AboutUsPage from '../components/aboutUs/AboutUsPage';
import { RootState, store } from '../store/store';
import { authCheckState } from '../store/slices/auth/authAction';

function App() {
    useEffect(() => {
        authCheckState();
    }, []);

    return (
        <Provider store={store}>
            <ToastContainer autoClose={5000} />
            <Router>
                <Route
                    render={() => (
                        <div>
                            <NavBar />
                            <Switch>
                                <Route path="/rexa/login" component={LoginPage} />
                                <Route path="/rexa/logout" component={Logout} />
                                <Route
                                    path="/oauth2/redirect"
                                    component={OAuth2RedirectHandler}
                                />
                                <Route path="/rexa/notfound" component={NotFound} />
                                <PrivateRoute
                                    path="/rexa/dashboard"
                                    component={DashboardPage}
                                />
                                <PrivateRoute
                                    path="/rexa/project"
                                    component={ProjectPage}
                                />
                                <PrivateRoute
                                    path="/rexa/settings"
                                    component={SettingsDetailsPage}
                                />
                                <PrivateRoute
                                    path="/rexa/management"
                                    component={UsersManagementPage}
                                />
                                <PrivateRoute
                                    path="/rexa/aboutUs"
                                    component={AboutUsPage}
                                />
                                <Redirect to="/rexa/dashboard" />
                            </Switch>
                        </div>
                    )}
                />
            </Router>
        </Provider>
    );
}

export default App;

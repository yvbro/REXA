import React from 'react';
import PropTypes from 'prop-types';

import { connect, Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { bindActionCreators, compose } from 'redux';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'font-awesome/css/font-awesome.min.css';

import DashboardPage from '../components/dashboard/page/DashboardPage';
import Header from './Header';
import ProjectPage from '../components/project/page/ProjectPage';
import SettingsDetailsPage from '../components/settings/page/SettingsDetailsPage';
import UsersManagementPage from '../components/management/page/UsersManagementPage';
import LoginPage from '../components/auth/page/LoginPage';
import PrivateRoute from './PrivateRoute';
import LoadingIndicator from '../components/common/LoadingIndicator';
import NotFound from '../components/common/NotFound';
import {getCurrentUser} from '../components/auth/redux/authDuck';
import OAuth2RedirectHandler from '../components/auth/smart/OAuth2RedirectHandler';

class App extends React.Component {
    componentDidMount() {
        document.title = 'ReXA';
        this.props.getCurrentUser();
    }

    render() {
        const { store, authenticated, loading } = this.props;

        if (loading) {
            return <LoadingIndicator />;
        }

        return (
            <Provider store={store}>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <ToastContainer autoClose={5000} />
                <Router>
                    <Route
                        render={({ location }) => (
                            <div>
                                <Header />
                                <Switch>
                                    <Route
                                        path="/rexa/login"
                                        component={() => (
                                            <LoginPage
                                                authenticated={authenticated}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/oauth2/redirect"
                                        component={OAuth2RedirectHandler}
                                    />

                                    <Route
                                        path="/rexa/notfound"
                                        component={() => <NotFound />}
                                    />
                                    <PrivateRoute
                                        path="/rexa/dashboard"
                                        component={() => <DashboardPage />}
                                    />
                                    <PrivateRoute
                                        path="/rexa/project"
                                        component={() => <ProjectPage />}
                                    />
                                    <PrivateRoute
                                        path="/rexa/settings"
                                        component={() => <SettingsDetailsPage />}
                                    />
                                    <PrivateRoute
                                        path="/rexa/management"
                                        component={() => <UsersManagementPage />}
                                    />
                                    <PrivateRoute
                                        path="/"
                                        component={() => (
                                            <Redirect
                                                to={{
                                                    pathname: '/rexa/dashboard',
                                                    state: { from: location },
                                                }}
                                            />
                                        )}
                                    />
                                </Switch>
                            </div>
                        )}
                    />
                </Router>
            </Provider>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
    loading: state.auth.loading,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getCurrentUser,
        },
        dispatch
    );
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);

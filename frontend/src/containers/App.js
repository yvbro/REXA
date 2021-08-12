import React from 'react';
import PropTypes from 'prop-types';

import { connect, Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { bindActionCreators, compose } from 'redux';

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
import { authCheckState } from '../components/auth/redux/authDuck';
import OAuth2RedirectHandler from '../components/auth/smart/OAuth2RedirectHandler';
import AboutUsPage from '../components/aboutUs/page/AboutUsPage';

class App extends React.Component {
    componentDidMount() {
        document.title = 'ReXA';
        this.props.authCheckState();
    }

    render() {
        const { store, loading } = this.props;

        if (loading) {
            return <LoadingIndicator />;
        }

        return (
            <Provider store={store}>
                <ToastContainer autoClose={5000} />
                <Router>
                    <Route
                        render={() => (
                            <div>
                                <NavBar />
                                <Switch>
                                    <Route
                                        path="/rexa/login"
                                        component={LoginPage}
                                    />
                                    <Route path="/rexa/logout" component={Logout} />
                                    <Route
                                        path="/oauth2/redirect"
                                        component={OAuth2RedirectHandler}
                                    />

                                    <Route
                                        path="/rexa/notfound"
                                        component={NotFound}
                                    />
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
}

App.propTypes = {
    store: PropTypes.object.isRequired,
    authCheckState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            authCheckState,
        },
        dispatch
    );
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);

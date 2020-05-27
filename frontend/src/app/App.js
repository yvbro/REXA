import React from "react";
import PropTypes from 'prop-types';

import {connect, Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import {Route, Switch, BrowserRouter as Router, Redirect} from "react-router-dom";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

import DashboardPage from "../dashboard/DashboardPage";
import Header from "./Header";
import AppLayout from "./AppLayout";
import ProjectPage from "../project/ProjectPage";
import LoginPage from "../auth/LoginPage";
import PrivateRoute from "./PrivateRoute";
import LoadingIndicator from "./LoadingIndicator";
import {bindActionCreators, compose} from "redux";
import {getCurrentUser} from "../auth/authDuck";
import OAuth2RedirectHandler from "../auth/OAuth2RedirectHandler";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.props.getCurrentUser();
    }

    render() {
        const {store, authenticated, loading} = this.props;

        if(loading) {
            return <LoadingIndicator />
        }

        return (
            <Provider store={store}>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                    crossOrigin="anonymous"
                />
                <ToastContainer autoClose={5000}/>
                <Router>
                    <Route
                        render={({location, history}) => (
                            <div>
                                <Header location={location}
                                        history={history}
                                        authenticated={authenticated}/>
                                <AppLayout>
                                    <Switch>
                                        <Route path="/login" component={() => <LoginPage authenticated={authenticated}/>}/>
                                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
                                        <PrivateRoute
                                            authenticated={authenticated}
                                            path="/rexa/dashboard"
                                            component={() => <DashboardPage/>}
                                        />
                                        <PrivateRoute
                                            authenticated={authenticated}
                                            path="/rexa/project"
                                            component={() => <ProjectPage/>}/>
                                        <PrivateRoute
                                            authenticated={authenticated}
                                            path="/"
                                            component={() => <Redirect
                                                to={{
                                                    pathname: "/rexa/dashboard",
                                                    state: {from: location}
                                                }}/>}/>
                                    </Switch>
                                </AppLayout>
                            </div>
                        )}
                    />
                </Router>
            </Provider>
        )
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
    )
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(App)

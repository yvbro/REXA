import React from "react";

import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import configureStore from "./store";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

import DashboardPage from "../dashboard/DashboardPage";
import Header from "./Header";
import AppLayout from "./AppLayout";
import ProjectPage from "../project/ProjectPage";
import LoginPage from "../auth/LoginPage";
import PrivateRoute from "./PrivateRoute";

const store = configureStore();

const App = () => (
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
                        <Header location={location} history={history}/>
                        <AppLayout>
                            <Switch>
                                <PrivateRoute
                                    path="/dashboard"
                                    component={() => <DashboardPage/>}
                                />
                                <PrivateRoute path="/project" component={() => <ProjectPage/>}/>
                                <Route path="/login" component={() => <LoginPage/>}/>
                                <Route path="/" component={() => <LoginPage/>}/>
                            </Switch>
                        </AppLayout>
                    </div>
                )}
            />
        </Router>
    </Provider>
);

export default App

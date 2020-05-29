import React from "react";
import PropTypes from 'prop-types';
import {Redirect, Route} from "react-router-dom";
import {bindActionCreators} from "redux";
import {getCurrentUser} from "../auth/authDuck";
import {connect} from "react-redux";
import LoadingIndicator from "./LoadingIndicator";

class PrivateRoute extends React.Component {
    render() {
        const {component: Component, authenticated, loading, ...rest} = this.props;

        if(loading) {
            return <LoadingIndicator />
        }

        return (
            <div>
                <Route
                    {...rest}
                    render={props =>
                        authenticated ? (
                            <Component {...props} />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/rexa/login",
                                    state: {from: props.location}
                                }}
                            />
                        )
                    }
                />
            </div>
        )
    }
}

PrivateRoute.propTypes = {
    component: PropTypes.func,
    getCurrentUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool,
    loading: PropTypes.bool,
};

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    loading: state.auth.loading
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getCurrentUser
        },
        dispatch
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PrivateRoute)

import React from "react";
import PropTypes from 'prop-types';
import {Redirect, Route} from "react-router-dom";
import {bindActionCreators} from "redux";
import {getCurrentUser} from "../auth/authDuck";
import {connect} from "react-redux";

class PrivateRoute extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {hasFetchCurrentUser: false};
    }

    componentDidMount() {
        this._isMounted = true;
        const {authenticated, getCurrentUser} = this.props;
        if (!authenticated) {
            getCurrentUser().finally(() => {
                if (this._isMounted) {
                    this.setState({hasFetchCurrentUser: true})
                }
            });
        } else {
            if (this._isMounted) {
                this.setState({hasFetchCurrentUser: true});
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {component: Component, authenticated, ...rest} = this.props;
        const {hasFetchCurrentUser} = this.state;

        return (
            <div>
                {hasFetchCurrentUser &&
                <Route
                    {...rest}
                    render={props =>
                        authenticated ? (
                            <Component {...props} />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {from: props.location}
                                }}
                            />
                        )
                    }
                />
                }
            </div>
        )
    }
}

PrivateRoute.propTypes = {
    component: PropTypes.func,
    getCurrentUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({authenticated: state.auth.authenticated});

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

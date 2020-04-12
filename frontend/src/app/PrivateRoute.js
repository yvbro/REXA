import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators, compose} from "redux";

import {Redirect, Route} from "react-router-dom";
import {getCurrentUser} from "../auth/authDuck";

class PrivateRoute extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasFetchCurrentUser: false };
    }

    componentDidMount() {
        if (!this.props.isLogged) {
          this.props.getCurrentUser()
            .finally(() => this.setState({ hasFetchCurrentUser: true }));
        } else {
          this.setState({ hasFetchCurrentUser: true });
        }
      }

    render() {
        const { component: Component, isLogged, ...rest }  = this.props;
        const { hasFetchCurrentUser } = this.state;

        return (
            <div>
            {hasFetchCurrentUser &&
                        <Route
                            {...rest}
                            render={props =>
                            isLogged ? (
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
    getCurrentUser: PropTypes.func.isRequired,
  };


const mapStateToProps = state => ({isLogged: state.auth.isLogged});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCurrentUser
    },
    dispatch
  )
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ))(PrivateRoute)

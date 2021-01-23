import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {loginSuccess} from '../redux/authDuck';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null
            ? ''
            : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if (token) {
            const payload = {
                token: token,
                username: "google",
                xnatUser: "",
                xnatHost: "",
                isAdmin: false,
            }
            this.props.login(payload).then(() => {
                return (
                    <Redirect
                        to={{
                            pathname: '/rexa/dashboard',
                            state: { from: this.props.location },
                        }}
                    />
                );
            })
        } else {
            return (
                <Redirect
                    to={{
                        pathname: '/rexa/login',
                        state: {
                            from: this.props.location,
                            error: error,
                        },
                    }}
                />
            );
        }
    }
}

OAuth2RedirectHandler.propTypes = {
    // react-router provided
    location: PropTypes.object,
};

const mapDispatchToProps = dispatch => {
    return {
        login: (payload) => dispatch( loginSuccess(payload) )
    };
  };

export default connect(null, mapDispatchToProps)(OAuth2RedirectHandler);

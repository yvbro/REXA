import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { extractPayload,  } from '../../../store/slices/auth/authAction' 
function OAuth2RedirectHandler() {
    const getUrlParameter = (name: string) => {
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null
            ? ''
            : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    useEffect(() => {  
        
    }, []);


    render() {
        const token = getUrlParameter('token');
        const error = etUrlParameter('error');

        if (token) {
            this.props.login(extractPayload(token)).then(() => {
                return (
                    <Redirect
                        to={{
                            pathname: '/rexa/dashboard',
                            state: { from: this.props.location },
                        }}
                    />
                );
            });
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
    login: PropTypes.func.isRequired,
    // react-router provided
    location: PropTypes.object,
};


export default OAuth2RedirectHandler;

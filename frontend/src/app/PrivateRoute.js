import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadingIndicator from '../common/LoadingIndicator';

const PrivateRoute = ({component: Component, ...rest}) => {
    const location = useLocation();

    const {authenticated, loading} = useSelector((state) => ({
        authenticated: state.auth.authenticated,
        loading: state.auth.loading,
    }));

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <div>
            <Route
                {...rest}
                render={(props) =>
                    authenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/rexa/login',
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        </div>
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.func,
};

export default PrivateRoute;

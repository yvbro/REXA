import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { performLogout } from '../../../store/slices/auth/authAction';


const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(performLogout());
    }, [dispatch]);

    return <Redirect to="/rexa/login" />;
};

export default Logout;

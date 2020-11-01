import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../../app/AppLayout';
import { fetchUsers } from '../redux/userDuck';
import LoadingIndicator from '../../common/LoadingIndicator';
import UserListPage from '../smart/UserListPage';

const UsersManagementPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const { loading } = useSelector((state) => ({
        loading: state.user.loading,
    }));

    return (
        <AppLayout>
            {loading ? <LoadingIndicator /> : <UserListPage />}
        </AppLayout>
    );
};

export default UsersManagementPage;

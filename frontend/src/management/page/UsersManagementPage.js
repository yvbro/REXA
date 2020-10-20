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

    const { users, loading } = useSelector((state) => ({
        users: state.user.users.data,
        loading: state.user.users.loading,
    }));

    return (
        <AppLayout>
            {loading ? <LoadingIndicator /> : <UserListPage users={users} />}
        </AppLayout>
    );
};

export default UsersManagementPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

    return <>{loading ? <LoadingIndicator /> : <UserListPage />}</>;
};

export default UsersManagementPage;

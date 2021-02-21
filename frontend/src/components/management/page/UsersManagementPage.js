import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../redux/userDuck';
import LoadingIndicator from '../../common/LoadingIndicator';
import UserListPage from '../smart/UserListPage';

const UsersManagementPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        dispatch(fetchUsers(page, rowsPerPage));
    }, [dispatch, page, rowsPerPage]);

    const { loading } = useSelector((state) => ({
        loading: state.user.loading,
    }));

    return (
        <>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <UserListPage
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                />
            )}
        </>
    );
};

export default UsersManagementPage;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchUsers } from '../redux/userDuck';
import UserListPage from '../smart/UserListPage';

const UsersManagementPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        dispatch(fetchUsers(page, rowsPerPage));
    }, [dispatch, page, rowsPerPage]);

    return (
        <UserListPage
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
        />
    );
};

export default UsersManagementPage;

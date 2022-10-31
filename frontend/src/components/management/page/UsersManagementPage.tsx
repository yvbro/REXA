import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import UserListPage from '../smart/UserListPage';
import { UserRexa } from '../../../models/management/UserRexa';
import { Page } from '../../../models/Page';
import LoadingIndicator from '../../common/LoadingIndicator';
import useUsersManagementService from '../../../services/useUsersManagementService';

const UsersManagementPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { fetchUsers } = useUsersManagementService();

    const {
        isLoading,
        isFetching,
        data: users,
    } = useQuery(['fetchUsers', page, rowsPerPage], () =>
        fetchUsers(page, rowsPerPage)
    );

    if (isLoading || isFetching) {
        return <LoadingIndicator />;
    }

    return (
        <UserListPage
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            pageOfUsers={users?.data!!}
            setRowsPerPage={setRowsPerPage}
        />
    );
};

export default UsersManagementPage;

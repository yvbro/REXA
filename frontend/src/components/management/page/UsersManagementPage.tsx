import React, { useState } from 'react';
import { useQuery } from 'react-query';

import UserListPage from '../smart/UserListPage';
import LoadingIndicator from '../../common/LoadingIndicator';
import useUsersManagementService from '../../../services/useUsersManagementService';

function UsersManagementPage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [refetchUsers, setRefetchUsers] = useState(false);

    const { fetchUsers } = useUsersManagementService();

    const { isLoading, data: users } = useQuery(
        ['fetchUsers', page, rowsPerPage, refetchUsers],
        () => fetchUsers(page, rowsPerPage)
    );

    if (isLoading || users === undefined) {
        return <LoadingIndicator />;
    }

    return (
        <UserListPage
            page={page}
            setPage={setPage}
            refetchUsers={() => setRefetchUsers(!refetchUsers)}
            rowsPerPage={rowsPerPage}
            pageOfUsers={users?.data}
            setRowsPerPage={setRowsPerPage}
        />
    );
}

export default UsersManagementPage;

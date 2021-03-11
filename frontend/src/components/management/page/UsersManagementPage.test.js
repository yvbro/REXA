import React from 'react';
import { renderWithStore, cleanup } from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';

import UsersManagementPage from './UsersManagementPage';

const TEST_USERS = [
    { email: 'admin@test.com', roles: ['ADMIN', 'USER'], enabled: true },
    { email: 'user@test.com', roles: ['USER'], enabled: true },
    { email: 'disabled@test.com', roles: ['USER'], enabled: false },
];

const REGULAR_STATE = {
    user: {
        data: TEST_USERS,
        totalElements: 3,
        loading: false,
    },
};

describe('The UsersManagementPage component', () => {
    afterEach(cleanup);

    test('should take a snapshot', () => {
        const { asFragment } = renderWithStore(
            <UsersManagementPage />,
            REGULAR_STATE
        );

        expect(asFragment(<UsersManagementPage />)).toMatchSnapshot();
    });

    test('should display table if not loading', () => {
        const { getByRole, getAllByRole } = renderWithStore(
            <UsersManagementPage />,
            REGULAR_STATE
        );

        const table = getAllByRole('table')[0];

        expect(getByRole('heading')).toHaveTextContent('User Management');
        expect(table).toBeInTheDocument();
    });
});

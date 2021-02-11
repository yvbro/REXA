import React from 'react';
import {renderWithStore, cleanup} from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';

import UsersManagementPage from './UsersManagementPage';

const TEST_USERS = [
    { email: 'admin@test.com', roles: ['ADMIN', 'USER'], enabled: true},
    { email: 'user@test.com', roles: ['USER'], enabled: true},
    { email: 'disabled@test.com', roles: ['USER'], enabled: false},
];

const REGULAR_STATE = {
    user: {
        data: TEST_USERS,
        loading: false,
    }
};

describe('The UsersManagementPage component', () => {
    afterEach(cleanup);

    test('should take a snapshot', () => {
        const { asFragment } = renderWithStore(<UsersManagementPage />, REGULAR_STATE);

        expect(asFragment(<UsersManagementPage />)).toMatchSnapshot();
    });

    test('should display LoadingIndicator if loading', () => {
        const { getByRole } = renderWithStore(<UsersManagementPage />, {user: {loading: true}});

        expect(getByRole('progressbar')).toBeInTheDocument();
    });

    test('should display table if not loading', () => {
        const { getByRole } = renderWithStore(<UsersManagementPage />, REGULAR_STATE);

        expect(getByRole('heading')).toHaveTextContent('User Management');
        expect(getByRole('table')).toBeInTheDocument();
    });
});
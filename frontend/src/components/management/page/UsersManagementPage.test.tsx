import React from 'react';
import { cleanup } from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';

import UsersManagementPage from './UsersManagementPage';
import { render } from '@testing-library/react';
import useUsersManagementService from '../../../services/useUsersManagementService';

const mockFetchUsers = jest.fn(() => Promise.resolve());

jest.mock('../../../services/useUsersManagementService', () => {
    const originalModule = jest.requireActual(
        '../../../services/useUsersManagementService'
    );

    return {
        __esModule: true,
        ...originalModule,
        default: () => ({
            updatePassword: jest.fn(),
            addUser: jest.fn(),
            fetchUsers: mockFetchUsers,
            switchEnabledUser: jest.fn(),
        }),
    };
});

jest.mock('react-query', () => ({
    useQuery: () => ({
        isLoading: true,
        error: {},
        data: {
            content: [
                {
                    email: 'admin@test.com',
                    roles: ['admin', 'user'],
                    enabled: true,
                    authProvider: 'local',
                },
                {
                    email: 'user@test.com',
                    roles: ['user'],
                    enabled: true,
                    authProvider: 'local',
                },
                {
                    email: 'disabled@gmail.com',
                    roles: ['user'],
                    enabled: false,
                    authProvider: 'google',
                },
            ],
            size: 3,
            first: true,
            last: true,
            totalPages: 1,
            totalElements: 3,
        },
    }),
}));

describe('The UsersManagementPage component', () => {
    afterEach(cleanup);

    test('should display loader if loading', () => {
        const { getAllByLabelText } = render(<UsersManagementPage />);

        expect(getAllByLabelText('loader')[0]).toBeCalled;
    });
});

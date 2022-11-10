/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import UserListPage from './UserListPage';
import { RexaRole } from '../../../models/management/RexaRole';
import {
    screen,
    cleanup,
    fireEvent,
    renderWithStore,
} from '../../../helpers/test/test-utils';

const mockSwitchEnabledUser = jest.fn(() => Promise.resolve());

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
            fetchUsers: jest.fn(),
            switchEnabledUser: mockSwitchEnabledUser,
        }),
    };
});

const NUMBER_COLUMNS = 4;
const NUMBER_LINE = 3;
const PAGINATION_LINE = 1;

const PAGE = 0;
const ROW_PER_PAGE = 10;
const SET_PAGE_ACTION = jest.fn();
const SET_ROW_PER_PAGE_ACTION = jest.fn();
const REFETCH_USERS = jest.fn();

const TEST_USERS = {
    content: [
        {
            email: 'admin@test.com',
            roles: [RexaRole.ADMIN, RexaRole.USER],
            enabled: true,
            authProvider: 'local',
        },
        {
            email: 'user@test.com',
            roles: [RexaRole.USER],
            enabled: true,
            authProvider: 'local',
        },
        {
            email: 'disabled@gmail.com',
            roles: [RexaRole.USER],
            enabled: false,
            authProvider: 'google',
        },
    ],
    size: 3,
    first: true,
    last: true,
    totalPages: 1,
    totalElements: 3,
};

const REGULAR_STATE = {
    user: {
        data: TEST_USERS.content,
        totalElements: 3,
        loading: false,
    },
};

describe('The UserListPage component', () => {
    afterEach(cleanup);

    it('should display user table properly', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        const table = screen.getAllByRole('table')[0];

        expect(screen.getByRole('heading')).toHaveTextContent('User Management');
        expect(table).toBeInTheDocument();
        // Title
        expect(
            screen.getByRole('row', { name: 'Email Role Enabled Actions' })
        ).toBeInTheDocument();
        // Content
        expect(
            screen.getByRole('row', {
                name: 'admin@test.com ADMIN,USER primary checkbox',
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('row', { name: 'user@test.com USER primary checkbox' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('row', {
                name: 'disabled@gmail.com USER primary checkbox',
            })
        ).toBeInTheDocument();
    });

    it('should contain a table with 4 columns for one header meaning 4 columnheaders', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        expect(screen.getAllByRole('columnheader')).toHaveLength(NUMBER_COLUMNS);
    });

    it('should contain a table with 4 columns and 3 lines meaning 12 cells', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        expect(screen.getAllByRole('cell')).toHaveLength(
            NUMBER_COLUMNS * NUMBER_LINE + PAGINATION_LINE
        );
    });

    it('should have disabled checkbox and span for edit if user is admin', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        expect(screen.getAllByRole('checkbox')[0]).toBeDisabled();
        expect(screen.getAllByLabelText('edit password')[0]).toHaveAttribute(
            'aria-disabled',
            'true'
        );
    });

    it('should have enabled checkbox if user is not admin', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        expect(screen.getAllByRole('checkbox')[1]).not.toBeDisabled();
        expect(screen.getAllByRole('checkbox')[2]).not.toBeDisabled();
    });

    it('should have checked checkbox if user is enabled', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('checked');
    });

    it('should have checked checkbox if user disabled', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        expect(screen.getAllByRole('checkbox')[2]).not.toHaveAttribute('checked');
    });

    it('should have enabled span to edit password if user with local provider', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        expect(screen.getAllByLabelText('edit password')[1]).toHaveAttribute(
            'aria-disabled',
            'false'
        );
    });

    it('should have an img google in edit column if user with google provider', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        const lastCell =
            screen.getAllByRole('cell')[NUMBER_COLUMNS * NUMBER_LINE - 1];
        const img = screen.getByAltText('Google') as HTMLImageElement;

        expect(lastCell).toContainElement(img);
        expect(img.src).toContain('google-logo.png');
    });

    it('should open modal if click on edit for user with local provider', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        const editInput = screen.getAllByLabelText('edit password')[1];

        fireEvent.click(editInput);

        // Modal to edit password
        expect(screen.getByRole('presentation')).toHaveAttribute(
            'aria-labelledby',
            'editPasswordModal'
        );
    });

    it('should open modal if click on add user', () => {
        renderWithStore(
            <UserListPage
                pageOfUsers={TEST_USERS}
                page={PAGE}
                setPage={SET_PAGE_ACTION}
                rowsPerPage={ROW_PER_PAGE}
                setRowsPerPage={SET_ROW_PER_PAGE_ACTION}
                refetchUsers={REFETCH_USERS}
            />,
            REGULAR_STATE
        );

        const addUserButton = screen.getAllByRole('button')[5];

        fireEvent.click(addUserButton);

        // Modal to add user
        expect(screen.getByRole('presentation')).toHaveAttribute(
            'aria-labelledby',
            'addUserModal'
        );
    });
});

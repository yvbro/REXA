import React from 'react';
import {
    cleanup,
    fireEvent,
    renderWithStore,
    render,
    makeTestStore,
} from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';

import UserListPage from './UserListPage';
import useUsersManagementService from '../../../services/useUsersManagementService';
import { RexaRole } from '../../../models/management/RexaRole';

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
        const { getByRole, getAllByRole } = renderWithStore(
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

        const table = getAllByRole('table')[0];

        expect(getByRole('heading')).toHaveTextContent('User Management');
        expect(table).toBeInTheDocument();
        // Title
        expect(
            getByRole('row', { name: 'Email Role Enabled Actions' })
        ).toBeInTheDocument();
        // Content
        expect(
            getByRole('row', { name: 'admin@test.com ADMIN,USER primary checkbox' })
        ).toBeInTheDocument();
        expect(
            getByRole('row', { name: 'user@test.com USER primary checkbox' })
        ).toBeInTheDocument();
        expect(
            getByRole('row', { name: 'disabled@gmail.com USER primary checkbox' })
        ).toBeInTheDocument();
    });

    it('should contain a table with 4 columns for one header meaning 4 columnheaders', () => {
        const { getAllByRole } = renderWithStore(
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

        expect(getAllByRole('columnheader')).toHaveLength(NUMBER_COLUMNS);
    });

    it('should contain a table with 4 columns and 3 lines meaning 12 cells', () => {
        const { getAllByRole } = renderWithStore(
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

        expect(getAllByRole('cell')).toHaveLength(
            NUMBER_COLUMNS * NUMBER_LINE + PAGINATION_LINE
        );
    });

    it('should have disabled checkbox and span for edit if user is admin', () => {
        const { getAllByRole, getAllByLabelText } = renderWithStore(
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

        expect(getAllByRole('checkbox')[0]).toBeDisabled();
        expect(getAllByLabelText('edit password')[0]).toHaveAttribute(
            'aria-disabled',
            'true'
        );
    });

    it('should have enabled checkbox if user is not admin', () => {
        const { getAllByRole } = renderWithStore(
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

        expect(getAllByRole('checkbox')[1]).not.toBeDisabled();
        expect(getAllByRole('checkbox')[2]).not.toBeDisabled();
    });

    it('should have checked checkbox if user is enabled', () => {
        const { getAllByRole } = renderWithStore(
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

        expect(getAllByRole('checkbox')[0]).toHaveAttribute('checked');
    });

    it('should have checked checkbox if user disabled', () => {
        const { getAllByRole } = renderWithStore(
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

        expect(getAllByRole('checkbox')[2]).not.toHaveAttribute('checked');
    });

    it('should have enabled span to edit password if user with local provider', () => {
        const { getAllByLabelText } = renderWithStore(
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

        expect(getAllByLabelText('edit password')[1]).toHaveAttribute(
            'aria-disabled',
            'false'
        );
    });

    it('should have an img google in edit column if user with google provider', () => {
        const { getAllByRole, getByAltText } = renderWithStore(
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

        const lastCell = getAllByRole('cell')[NUMBER_COLUMNS * NUMBER_LINE - 1];
        const img = getByAltText('Google') as HTMLImageElement;

        expect(lastCell).toContainElement(img);
        expect(img.src).toContain('google-logo.png');
    });

    it('should open modal if click on edit for user with local provider', () => {
        const { getByRole, getAllByLabelText } = renderWithStore(
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

        const editInput = getAllByLabelText('edit password')[1];

        fireEvent.click(editInput);

        // Modal to edit password
        expect(getByRole('presentation')).toHaveAttribute(
            'aria-labelledby',
            'editPasswordModal'
        );
    });

    it('should open modal if click on add user', () => {
        const { getByRole, getAllByRole } = renderWithStore(
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

        const addUserButton = getAllByRole('button')[5];

        fireEvent.click(addUserButton);

        // Modal to add user
        expect(getByRole('presentation')).toHaveAttribute(
            'aria-labelledby',
            'addUserModal'
        );
    });
});

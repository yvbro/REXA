import React from 'react';
import { cleanup, fireEvent, renderWithStore, render, makeTestStore } from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';

import UserListPage from './UserListPage';
import { SWITCH_ENABLED_USER } from '../redux/userDuck';
import { pending } from '../../../helpers/promise';

const NUMBER_COLUMNS = 4;
const NUMBER_LINE = 3;

const TEST_USERS = [
    { email: 'admin@test.com', roles: ['ADMIN', 'USER'], enabled: true, authProvider: 'local'},
    { email: 'user@test.com', roles: ['USER'], enabled: true, authProvider: 'local'},
    { email: 'disabled@gmail.com', roles: ['USER'], enabled: false, authProvider: 'google'},
];

const TEST_ACTION = {
    type: pending(SWITCH_ENABLED_USER),
    payload: { userEmail: TEST_USERS[2].email, enabled: !TEST_USERS[2].enabled }
};

const REGULAR_STATE = {
    user: {
        data: TEST_USERS,
        loading: false
    }
};

describe('The UserListPage component', () => {
    
    afterEach(cleanup);

    it('should take a snapshot', () => {
        const { asFragment } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(asFragment(<UserListPage />)).toMatchSnapshot();
    });

    it('should display user table properly', () => {
        const { getByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getByRole('heading')).toHaveTextContent('User Management');
        expect(getByRole('table')).toBeInTheDocument();
        // Title
        expect(getByRole('row', { name: 'Email Role Enabled Actions'})).toBeInTheDocument();
        // Content
        expect(getByRole('row', { name: 'admin@test.com ADMIN,USER primary checkbox'})).toBeInTheDocument();
        expect(getByRole('row', { name: 'user@test.com USER primary checkbox'})).toBeInTheDocument();
        expect(getByRole('row', { name: 'disabled@gmail.com USER primary checkbox'})).toBeInTheDocument();
    });

    it('should contain a table with 4 columns for one header meaning 4 columnheaders', () => {
        const { getAllByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByRole('columnheader')).toHaveLength(NUMBER_COLUMNS);
    });

    it('should contain a table with 4 columns and 3 lines meaning 12 cells', () => {
        const { getAllByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByRole('cell')).toHaveLength(NUMBER_COLUMNS * NUMBER_LINE);
    });

    it('should have disabled checkbox and span for edit if user is admin', () => {
        const { getAllByRole, getAllByLabelText } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByRole('checkbox')[0]).toBeDisabled();
        expect(getAllByLabelText('edit password')[0]).toHaveAttribute('aria-disabled', 'true');
    });

    it('should have enabled checkbox if user is not admin', () => {
        const { getAllByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByRole('checkbox')[1]).not.toBeDisabled();
        expect(getAllByRole('checkbox')[2]).not.toBeDisabled();
    });

    it('should have checked checkbox if user is enabled', () => {
        const { getAllByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByRole('checkbox')[0]).toHaveAttribute('checked');
    });

    it('should have checked checkbox if user disabled', () => {
        const { getAllByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByRole('checkbox')[2]).not.toHaveAttribute('checked');
    });

    it('should have enabled span to edit password if user with local provider', () => {
        const { getAllByLabelText } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByLabelText('edit password')[1]).toHaveAttribute('aria-disabled', 'false');
    });

    it('should have an img google in edit column if user with google provider', () => {
        const { getAllByRole, getByAltText } = renderWithStore(<UserListPage />, REGULAR_STATE);

        const lastCell = getAllByRole('cell')[NUMBER_COLUMNS * NUMBER_LINE - 1];
        const img = getByAltText('Google');

        expect(lastCell).toContainElement(img);
        expect(img.src).toContain('google-logo.png');
    });

    it('should dispatch action if click on checkbox', () => {
        const store = makeTestStore(REGULAR_STATE);

        const { getAllByRole } = render(<UserListPage />, { store });

        const checkbox = getAllByRole('checkbox')[2];
        expect(checkbox).not.toHaveAttribute('checked');

        fireEvent.click(checkbox);

        expect(store.getActions()).toStrictEqual([TEST_ACTION]);
    });

    it('should open modal if click on edit for user with local provider', () => {
        const { getByRole, getAllByLabelText } = renderWithStore(<UserListPage />, REGULAR_STATE);

        const editInput = getAllByLabelText('edit password')[1];

        fireEvent.click(editInput);

        // Modal to edit password
        expect(getByRole('presentation')).toHaveAttribute('aria-labelledby', 'editPasswordModal');
    });

    it('should open modal if click on add user', () => {
        const { getByRole, getAllByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        const addUserButton = getAllByRole('button')[2];

        fireEvent.click(addUserButton);

        // Modal to add user
        expect(getByRole('presentation')).toHaveAttribute('aria-labelledby', 'addUserModal');
    });
});

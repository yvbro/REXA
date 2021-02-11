import React from 'react';
import { cleanup, fireEvent, renderWithStore, render, makeTestStore } from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';

import UserListPage from './UserListPage';
import { switchEnabledUser } from '../redux/userDuck';

const TEST_USERS = [
    { email: 'admin@test.com', roles: ['ADMIN', 'USER'], enabled: true},
    { email: 'user@test.com', roles: ['USER'], enabled: true},
    { email: 'disabled@test.com', roles: ['USER'], enabled: false},
];

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
        expect(getByRole('row', { name: 'admin@test.com ADMIN,USER primary checkbox'})).toBeInTheDocument();
        expect(getByRole('row', { name: 'user@test.com USER primary checkbox'})).toBeInTheDocument();
        expect(getByRole('row', { name: 'disabled@test.com USER primary checkbox'})).toBeInTheDocument();
    });

    it('should disabled checkbox if admin', () => {
        const { getAllByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByRole('checkbox')[0]).toBeDisabled();
    });


    it('should enabled checkbox if not admin', () => {
        const { getAllByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByRole('checkbox')[1]).not.toBeDisabled();
        expect(getAllByRole('checkbox')[2]).not.toBeDisabled();
    });

    it('should checked checkbox if user enabled', () => {
        const { getAllByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByRole('checkbox')[0]).toHaveAttribute('checked');
    });

    it('should checked checkbox if user disabled', () => {
        const { getAllByRole } = renderWithStore(<UserListPage />, REGULAR_STATE);

        expect(getAllByRole('checkbox')[2]).not.toHaveAttribute('checked');
    });

    it('should dispatch action if click on checkbox', () => {
        const store = makeTestStore(REGULAR_STATE);
        store.dispatch(switchEnabledUser(TEST_USERS[2].email, TEST_USERS[2].enabled));

        const { getAllByRole } = render(<UserListPage />, { store });

        const checkbox = getAllByRole('checkbox')[2];
        expect(checkbox).not.toHaveAttribute('checked');

        fireEvent.click(checkbox);

        expect(store.dispatch).toHaveBeenCalled();
    });
});
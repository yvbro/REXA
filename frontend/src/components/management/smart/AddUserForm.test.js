import React from 'react';
import { cleanup, fireEvent, renderWithStore, makeTestStore, render } from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';

import AddUserForm from './AddUserForm';

import * as userDuck from '../redux/userDuck';

// With jest.mock our API method does nothing
// we don't want to hit the server in our tests
jest.mock('../redux/userDuck');

const CLOSE_ACTION = jest.fn();
const TEST_USERS = [
    { email: 'admin@test.com', roles: ['ADMIN', 'USER'], enabled: true, authProvider: 'local'},
    { email: 'user@test.com', roles: ['USER'], enabled: true, authProvider: 'local'},
    { email: 'disabled@gmail.com', roles: ['USER'], enabled: false, authProvider: 'google'},
];

const REGULAR_STATE = {
    user: {
        data: TEST_USERS,
        loading: false
    }
};

const VALID_EMAIL = 'test@gmail.com';
const VALID_PASSWORD = 'Qwer1234';
const SHORT_PASSWORD = 'wrong';
const NO_NUMBER_PASSWORD = 'No number password';
const NO_CAPITAL_LETTER_PASSWORD = 'no capital letter password';

describe('The AddUserForm component', () => {
    
    afterEach(cleanup);

    it('should take a snapshot', () => {
        const { asFragment } = renderWithStore(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION}/>, {});

        expect(asFragment(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION}/>)).toMatchSnapshot();
    });

    it('should display the password rules', () => {
        const { getByTestId } = renderWithStore(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION}/>, {});

        expect(getByTestId('passwordRules')).toHaveTextContent('The password must be 8 characters long. It should contain a capital letter and a number.');
    });

    it('should call closeAction on Cancel button', () => {
        const { getByRole } = renderWithStore(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION}/>, {});

        const cancel = getByRole('button', {name: 'Cancel'});
        fireEvent.click(cancel);

        expect(CLOSE_ACTION).toHaveBeenCalledTimes(1);
    });

    // it('should call updatePassword on Save if no errors and close modal', () => {
    //     const store = makeTestStore(REGULAR_STATE);

    //     const { getByRole, getByTestId } = render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION}/>, { store });

    //     userDuck.addUser = jest.fn(() => Promise.resolve());
        
    //     const email = getByTestId('email');
    //     const passwordInput = getByTestId('password');

    //     fireEvent.change(email, { target: { value: VALID_EMAIL } });
    //     fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });

    //     const add = getByRole('button', {name: 'Add'});
    //     fireEvent.click(add);

    //     expect(userDuck.addUser).toHaveBeenCalledTimes(1);
    //     expect(userDuck.addUser).toHaveBeenCalledWith(VALID_EMAIL, VALID_PASSWORD);
    //     expect(CLOSE_ACTION).toHaveBeenCalledTimes(1);
    // });

    // it('should dispatch action if click on checkbox', () => {
    //     const store = makeTestStore(REGULAR_STATE);

    //     const { getAllByRole } = render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION}/>, { store });

    //     const checkbox = getAllByRole('checkbox')[2];
    //     expect(checkbox).not.toHaveAttribute('checked');

    //     fireEvent.click(checkbox);

    //     expect(store.getActions()).toStrictEqual([TEST_ACTION]);
    // });

    // it('should display error if password to short', () => {
    //     const { getByTestId, getByText } = renderWithStore(<AddUserForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION}/>, {});
        
    //     const passwordInput = getByTestId('newPassword');

    //     fireEvent.change(passwordInput, { target: { value: SHORT_PASSWORD } });

    //     expect(getByText('Password must be at least 8 characters long.')).toBeInTheDocument();
    // });

    // it('should display error if no number in password', () => {
    //     const { getByTestId, getByText } = renderWithStore(<AddUserForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION}/>, {});
        
    //     const passwordInput = getByTestId('newPassword');

    //     fireEvent.change(passwordInput, { target: { value: NO_NUMBER_PASSWORD } });

    //     expect(getByText('Password must contain a number.')).toBeInTheDocument();
    // });

    // it('should display error if no capital letter in password', () => {
    //     const { getByTestId, getByText } = renderWithStore(<AddUserForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION}/>, {});
        
    //     const passwordInput = getByTestId('newPassword');

    //     fireEvent.change(passwordInput, { target: { value: NO_CAPITAL_LETTER_PASSWORD } });

    //     expect(getByText('Password must contain a capital letter.')).toBeInTheDocument();
    // });

    // it('should display error if no match between password and confirmation', () => {
    //     const { getByTestId, getByText } = renderWithStore(<AddUserForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION}/>, {});
        
    //     const passwordInput = getByTestId('newPassword');
    //     const confirmationpasswordInput = getByTestId('confirmationPassword');

    //     fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
    //     fireEvent.change(confirmationpasswordInput, { target: { value: SHORT_PASSWORD } });

    //     expect(getByText('Password and confirmation does not match.')).toBeInTheDocument();
    // });

    // it('should have button Save disabled if missing confirmation password', () => {
    //     const { getByRole, getByTestId } = renderWithStore(<AddUserForm closeAction={CLOSE_ACTION}/>, {});

    //     const passwordInput = getByTestId('newPassword');

    //     fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });

    //     expect(getByRole('button', {name: 'Save'})).toBeDisabled();
    // });

    // it('should have button Save disabled if missing new password', () => {
    //     const { getByRole, getByTestId } = renderWithStore(<AddUserForm closeAction={CLOSE_ACTION}/>, {});

    //     const confirmationpasswordInput = getByTestId('confirmationPassword');

    //     fireEvent.change(confirmationpasswordInput, { target: { value: VALID_PASSWORD } });

    //     expect(getByRole('button', {name: 'Save'})).toBeDisabled();
    // });
});
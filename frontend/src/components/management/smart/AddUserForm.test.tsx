import React from 'react';
import { cleanup, fireEvent } from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import AddUserForm from './AddUserForm';

import useUsersManagementService from '../../../services/useUsersManagementService';

const mockAddUser = jest.fn(() => Promise.resolve());

jest.mock('../../../services/useUsersManagementService', () => {
    const originalModule = jest.requireActual(
        '../../../services/useUsersManagementService'
    );

    return {
        __esModule: true,
        ...originalModule,
        default: () => ({
            updatePassword: jest.fn(),
            addUser: mockAddUser,
            fetchUsers: jest.fn(),
            switchEnabledUser: jest.fn(),
        }),
    };
});

const CLOSE_ACTION = jest.fn();
const TEST_USERS = ['admin@test.com', 'user@test.com', 'disabled@gmail.com'];

const VALID_EMAIL = 'test@gmail.com';
const INVALID_EMAIL = 'username';
const VALID_PASSWORD = 'Qwer1234';
const SHORT_PASSWORD = 'wrong';
const NO_NUMBER_PASSWORD = 'No number password';
const NO_CAPITAL_LETTER_PASSWORD = 'no capital letter password';

describe('The AddUserForm component', () => {
    afterEach(cleanup);

    it('should take a snapshot', () => {
        const { asFragment } = render(
            <AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should display the password rules', () => {
        const { getByTestId } = render(
            <AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />
        );

        expect(getByTestId('passwordRules')).toHaveTextContent(
            'The password must be 8 characters long. It should contain a capital letter and a number.'
        );
    });

    it('should call closeAction on Cancel button', () => {
        const { getByRole } = render(
            <AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />
        );

        const cancel = getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancel);

        expect(CLOSE_ACTION).toHaveBeenCalledTimes(1);
    });

    it('should call addUser on Add if no errors and close modal', () => {
        const { getByRole, getByTestId } = render(
            <AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />
        );

        const email = getByTestId('email');
        const passwordInput = getByTestId('password');

        fireEvent.change(email, { target: { value: VALID_EMAIL } });
        fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });

        const add = getByRole('button', { name: 'Add' });
        fireEvent.click(add);

        expect(mockAddUser).toHaveBeenCalledTimes(1);
        expect(mockAddUser).toHaveBeenCalledWith({
            email: VALID_EMAIL,
            password: VALID_PASSWORD,
        });
        expect(CLOSE_ACTION).toHaveBeenCalledTimes(1);
    });

    it('should display error if password to short', () => {
        const { getByTestId, getByText } = render(
            <AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />
        );

        const passwordInput = getByTestId('password');

        fireEvent.change(passwordInput, { target: { value: SHORT_PASSWORD } });

        expect(
            getByText('Password must be at least 8 characters long.')
        ).toBeInTheDocument();
    });

    it('should display error if no number in password', () => {
        const { getByTestId, getByText } = render(
            <AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />
        );

        const passwordInput = getByTestId('password');

        fireEvent.change(passwordInput, { target: { value: NO_NUMBER_PASSWORD } });

        expect(getByText('Password must contain a number.')).toBeInTheDocument();
    });

    it('should display error if no capital letter in password', () => {
        const { getByTestId, getByText } = render(
            <AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />
        );

        const passwordInput = getByTestId('password');

        fireEvent.change(passwordInput, {
            target: { value: NO_CAPITAL_LETTER_PASSWORD },
        });

        expect(
            getByText('Password must contain a capital letter.')
        ).toBeInTheDocument();
    });

    it('should display error if add click with empty user email', () => {
        const { getByRole, getByText } = render(
            <AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />
        );

        const add = getByRole('button', { name: 'Add' });
        fireEvent.click(add);

        expect(getByText('Email must be set.')).toBeInTheDocument();
    });

    it('should display error if add click with invalid email', () => {
        const { getByTestId, getByRole, getByText } = render(
            <AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />
        );

        const passwordInput = getByTestId('email');
        fireEvent.change(passwordInput, { target: { value: INVALID_EMAIL } });

        const add = getByRole('button', { name: 'Add' });
        fireEvent.click(add);

        expect(getByText('Email invalid')).toBeInTheDocument();
    });

    it('should display error if add click with valid user email but empty password', () => {
        const { getByTestId, getByRole, getByText } = render(
            <AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />
        );

        const passwordInput = getByTestId('email');
        fireEvent.change(passwordInput, { target: { value: VALID_EMAIL } });

        const add = getByRole('button', { name: 'Add' });
        fireEvent.click(add);

        expect(getByText('Password must be set.')).toBeInTheDocument();
    });
});

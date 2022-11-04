/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { cleanup, fireEvent } from '../../../helpers/test/test-utils';
import AddUserForm from './AddUserForm';

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
        render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />);

        expect(screen.getByTestId('passwordRules')).toHaveTextContent(
            'The password must be 8 characters long. It should contain a capital letter and a number.'
        );
    });

    it('should call closeAction on Cancel button', () => {
        render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />);

        const cancel = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancel);

        expect(CLOSE_ACTION).toHaveBeenCalledTimes(1);
    });

    it('should call addUser on Add if no errors and close modal', () => {
        render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />);

        const email = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        fireEvent.change(email, { target: { value: VALID_EMAIL } });
        fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });

        const add = screen.getByRole('button', { name: 'Add' });
        fireEvent.click(add);

        expect(mockAddUser).toHaveBeenCalledTimes(1);
        expect(mockAddUser).toHaveBeenCalledWith({
            email: VALID_EMAIL,
            password: VALID_PASSWORD,
        });
    });

    it('should display error if password to short', () => {
        render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />);

        const passwordInput = screen.getByTestId('password');

        fireEvent.change(passwordInput, { target: { value: SHORT_PASSWORD } });

        expect(
            screen.getByText('Password must be at least 8 characters long.')
        ).toBeInTheDocument();
    });

    it('should display error if no number in password', () => {
        render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />);

        const passwordInput = screen.getByTestId('password');

        fireEvent.change(passwordInput, { target: { value: NO_NUMBER_PASSWORD } });

        expect(
            screen.getByText('Password must contain a number.')
        ).toBeInTheDocument();
    });

    it('should display error if no capital letter in password', () => {
        render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />);

        const passwordInput = screen.getByTestId('password');

        fireEvent.change(passwordInput, {
            target: { value: NO_CAPITAL_LETTER_PASSWORD },
        });

        expect(
            screen.getByText('Password must contain a capital letter.')
        ).toBeInTheDocument();
    });

    it('should display error if add click with empty user email', () => {
        render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />);

        const add = screen.getByRole('button', { name: 'Add' });
        fireEvent.click(add);

        expect(screen.getByText('Email must be set.')).toBeInTheDocument();
    });

    it('should display error if add click with invalid email', () => {
        render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />);

        const passwordInput = screen.getByTestId('email');
        fireEvent.change(passwordInput, { target: { value: INVALID_EMAIL } });

        const add = screen.getByRole('button', { name: 'Add' });
        fireEvent.click(add);

        expect(screen.getByText('Email invalid')).toBeInTheDocument();
    });

    it('should display error if add click with valid user email but empty password', () => {
        render(<AddUserForm users={TEST_USERS} closeAction={CLOSE_ACTION} />);

        const passwordInput = screen.getByTestId('email');
        fireEvent.change(passwordInput, { target: { value: VALID_EMAIL } });

        const add = screen.getByRole('button', { name: 'Add' });
        fireEvent.click(add);

        expect(screen.getByText('Password must be set.')).toBeInTheDocument();
    });
});

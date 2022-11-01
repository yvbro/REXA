import React from 'react';
import {
    cleanup,
    fireEvent,
    renderWithStore,
} from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import ChangePasswordForm from './ChangePasswordForm';

import useUsersManagementService from '../../../services/useUsersManagementService';
import UsersManagementPage from '../page/UsersManagementPage';

const mockUpdatePassword = jest.fn(() => Promise.resolve());

// With jest.mock our API method does store
// we don't want to hit the server in our tests
jest.mock('../../../services/useUsersManagementService', () => {
    const originalModule = jest.requireActual(
        '../../../services/useUsersManagementService'
    );

    return {
        __esModule: true,
        ...originalModule,
        default: () => ({
            updatePassword: mockUpdatePassword,
            addUser: jest.fn(),
            fetchUsers: jest.fn(),
            switchEnabledUser: jest.fn(),
        }),
    };
});

const CLOSE_ACTION = jest.fn();

const VALID_PASSWORD = 'Qwer1234';
const SHORT_PASSWORD = 'wrong';
const NO_NUMBER_PASSWORD = 'No number password';
const NO_CAPITAL_LETTER_PASSWORD = 'no capital letter password';
const USER_EMAIL = 'test@gmail.com';

describe('The ChangePasswordForm component', () => {
    afterEach(cleanup);

    it('should take a snapshot', () => {
        const { asFragment } = render(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should display the password rules', () => {
        const { getByTestId } = renderWithStore(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        const passwordRules = getByTestId('passwordRules');
        expect(passwordRules.textContent).toBe(
            'The password must be 8 characters long. It should contain a capital letter and a number.'
        );
    });

    it('should have button Save disabled if no value', () => {
        const { getByRole } = renderWithStore(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        expect(getByRole('button', { name: 'Save' }).getAttribute('disabled')).toBe(
            ''
        );
    });

    it('should call closeAction on Cancel button', () => {
        const { getByRole } = renderWithStore(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        const cancel = getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancel);

        expect(CLOSE_ACTION).toHaveBeenCalledTimes(1);
    });

    it('should call updatePassword on Save if no errors and close modal', () => {
        const { getByRole, getByTestId } = renderWithStore(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        const passwordInput = getByTestId('newPassword');
        const confirmationPasswordInput = getByTestId('confirmationPassword');

        fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
        fireEvent.change(confirmationPasswordInput, {
            target: { value: VALID_PASSWORD },
        });

        const save = getByRole('button', { name: 'Save' });
        fireEvent.click(save);

        expect(mockUpdatePassword).toHaveBeenCalledTimes(1);
        expect(mockUpdatePassword).toHaveBeenCalledWith({
            email: USER_EMAIL,
            newPassword: VALID_PASSWORD,
            confirmationPassword: VALID_PASSWORD,
        });

        expect(CLOSE_ACTION).toHaveBeenCalledTimes(1);
    });

    it('should display error if password to short', () => {
        const { getByTestId, getByText } = renderWithStore(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        const passwordInput = getByTestId('newPassword');

        fireEvent.change(passwordInput, { target: { value: SHORT_PASSWORD } });

        expect(
            getByText('Password must be at least 8 characters long.')
        ).toBeInTheDocument();
    });

    it('should display error if no number in password', () => {
        const { getByTestId, getByText } = renderWithStore(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        const passwordInput = getByTestId('newPassword');

        fireEvent.change(passwordInput, { target: { value: NO_NUMBER_PASSWORD } });

        expect(getByText('Password must contain a number.')).toBeInTheDocument();
    });

    it('should display error if no capital letter in password', () => {
        const { getByTestId, getByText } = renderWithStore(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        const passwordInput = getByTestId('newPassword');

        fireEvent.change(passwordInput, {
            target: { value: NO_CAPITAL_LETTER_PASSWORD },
        });

        expect(
            getByText('Password must contain a capital letter.')
        ).toBeInTheDocument();
    });

    it('should display error if no match between password and confirmation', () => {
        const { getByTestId, getByText } = renderWithStore(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        const passwordInput = getByTestId('newPassword');
        const confirmationpasswordInput = getByTestId('confirmationPassword');

        fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
        fireEvent.change(confirmationpasswordInput, {
            target: { value: SHORT_PASSWORD },
        });

        expect(
            getByText('Password and confirmation does not match.')
        ).toBeInTheDocument();
    });

    it('should have button Save disabled if missing confirmation password', () => {
        const { getByRole, getByTestId } = renderWithStore(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        const passwordInput = getByTestId('newPassword');

        fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });

        expect(getByRole('button', { name: 'Save' })).toBeDisabled();
    });

    it('should have button Save disabled if missing new password', () => {
        const { getByRole, getByTestId } = renderWithStore(
            <ChangePasswordForm userEmail={USER_EMAIL} closeAction={CLOSE_ACTION} />,
            {}
        );

        const confirmationpasswordInput = getByTestId('confirmationPassword');

        fireEvent.change(confirmationpasswordInput, {
            target: { value: VALID_PASSWORD },
        });

        expect(getByRole('button', { name: 'Save' })).toBeDisabled();
    });
});

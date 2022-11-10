import React from 'react';
import {
    cleanup,
    fireEvent,
    renderWithStore,
} from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';

import PasswordField from './PasswordField';

const VALUE = 'Qwer1234';
const LABEL = 'label';
const ERROR = 'This is an error message.';
const ON_CHANGE = jest.fn();
const TEST_ID = 'passwordId';

describe('The PasswordField component', () => {
    afterEach(cleanup);

    it('should take a snapshot', () => {
        const { asFragment } = renderWithStore(
            <PasswordField onChange={ON_CHANGE} />,
            {}
        );

        expect(asFragment(<PasswordField onChange={ON_CHANGE} />)).toMatchSnapshot();
    });

    it('should display a visibility button', () => {
        const { getByTestId } = renderWithStore(
            <PasswordField onChange={ON_CHANGE} />,
            {}
        );

        expect(getByTestId('visibilityButton')).toBeInTheDocument();
    });

    it('should change from type "password" to "text" when click on visibility button', () => {
        const { getByTestId } = renderWithStore(
            <PasswordField onChange={ON_CHANGE} testId={TEST_ID} />,
            {}
        );

        const passwordInput = getByTestId(TEST_ID);
        expect(passwordInput).toHaveAttribute('type', 'password');

        const visibilityButton = getByTestId('visibilityButton');
        fireEvent.click(visibilityButton);

        expect(passwordInput).toHaveAttribute('type', 'text');
    });

    it('should set value if given', () => {
        const { getByTestId } = renderWithStore(
            <PasswordField onChange={ON_CHANGE} testId={TEST_ID} value={VALUE} />,
            {}
        );

        expect(getByTestId(TEST_ID)).toHaveAttribute('value', VALUE);
    });

    it('should set label if given', () => {
        const { getByText } = renderWithStore(
            <PasswordField onChange={ON_CHANGE} testId={TEST_ID} label={LABEL} />,
            {}
        );

        expect(getByText(LABEL)).toBeInTheDocument();
    });

    it('should set error if given', () => {
        const { getByText } = renderWithStore(
            <PasswordField onChange={ON_CHANGE} testId={TEST_ID} error={ERROR} />,
            {}
        );

        expect(getByText(ERROR)).toBeInTheDocument();
    });
});

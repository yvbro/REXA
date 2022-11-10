import React from 'react';
import { cleanup, renderWithStore } from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';

import PasswordRules from './PasswordRules';

describe('The PasswordRules component', () => {
    afterEach(cleanup);

    it('should take a snapshot', () => {
        const { asFragment } = renderWithStore(<PasswordRules />, {});

        expect(asFragment(<PasswordRules />)).toMatchSnapshot();
    });

    it('should display the password rules', () => {
        const { getByTestId } = renderWithStore(<PasswordRules />, {});

        expect(getByTestId('passwordRules')).toHaveTextContent(
            'The password must be 8 characters long. It should contain a capital letter and a number.'
        );
    });
});

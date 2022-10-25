import React from 'react';
import { renderWithStore, cleanup } from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';

import SocialLogin from './SocialLogin';

import { GOOGLE_AUTH_URL } from '../../../helpers/constants/index';

describe('The SocialLogin component', () => {
    afterEach(cleanup);

    it('should take a snapshot', () => {
        const { asFragment } = renderWithStore(<SocialLogin />);

        expect(asFragment(<SocialLogin />)).toMatchSnapshot();
    });

    it('should display a link as a button with the text "Sign in with Google"', () => {
        const { getByRole } = renderWithStore(<SocialLogin />);

        expect(getByRole('link')).toHaveTextContent('Sign in with Google');
        expect(getByRole('link')).toHaveAttribute('href', GOOGLE_AUTH_URL);
    });
});

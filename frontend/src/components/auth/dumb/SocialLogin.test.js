import React from 'react';
import {render, cleanup} from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect'

import SocialLogin from "./SocialLogin";

import { GOOGLE_AUTH_URL } from "../../../helpers/constants/index";

afterEach(cleanup)

test('should take a snapshot', () => {
    const { asFragment } = render(<SocialLogin />);

    expect(asFragment(<SocialLogin />)).toMatchSnapshot();
})

test('should display a link as a button with the text "Sign in with Google"', () => {
    const { getByRole } = render(<SocialLogin />);

    expect(getByRole('link')).toHaveTextContent('Sign in with Google');
    expect(getByRole('link')).toHaveAttribute('href', GOOGLE_AUTH_URL);
})

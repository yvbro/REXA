import React from 'react';
import {render, cleanup} from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';
import * as ReactRedux from 'react-redux';

import UsersManagementPage from "./UsersManagementPage";

const TEST_USERS = [
    { email: 'admin@test.com', roles: ['ADMIN', 'USER'], enabled: true},
    { email: 'user@test.com', roles: ['USER'], enabled: true},
    { email: 'disabled@test.com', roles: ['USER'], enabled: false},
];

const REGULAR_STATE = {
    data: TEST_USERS,
    loading: false,
};

afterEach(cleanup)

test('should take a snapshot', () => {
    const mockXXXFn = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(mockXXXFn);

    const { asFragment } = render(<UsersManagementPage />);

    expect(asFragment(<UsersManagementPage />)).toMatchSnapshot();
})

test('should display LoadingIndicator if loading', () => {
    const mockXXXFn = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(mockXXXFn);

    const { getByRole } = render(<UsersManagementPage />, {initialState: {user: {loading: true}}});

    expect(getByRole('progressbar')).toBeInTheDocument();
})

test('should display user table if not loading', () => {
    const mockXXXFn = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(mockXXXFn);

    const { getByRole, getAllByRole } = render(<UsersManagementPage />, {initialState: {user: REGULAR_STATE}});

    expect(getByRole('heading')).toHaveTextContent('User Management');
    expect(getByRole('table')).toBeInTheDocument();
})
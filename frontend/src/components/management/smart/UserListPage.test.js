import React from 'react';
import { render, cleanup, fireEvent } from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';
import * as ReactRedux from 'react-redux';

import UserListPage from "./UserListPage";

const TEST_USERS = [
    { email: 'admin@test.com', roles: ['ADMIN', 'USER'], enabled: true},
    { email: 'user@test.com', roles: ['USER'], enabled: true},
    { email: 'disabled@test.com', roles: ['USER'], enabled: false},
];

const REGULAR_STATE = {
    data: TEST_USERS,
};

afterEach(cleanup)

test('should take a snapshot', () => {
    const mockXXXFn = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(mockXXXFn);

    const { asFragment } = render(<UserListPage />);

    expect(asFragment(<UserListPage />)).toMatchSnapshot();
})

test('should display user table properly', () => {
    const mockXXXFn = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(mockXXXFn);

    const { getByRole, getAllByRole } = render(<UserListPage />, {initialState: {user: REGULAR_STATE}});

    expect(getByRole('heading')).toHaveTextContent('User Management');
    expect(getByRole('table')).toBeInTheDocument();
    expect(getByRole('row', { name: 'admin@test.com ADMIN,USER primary checkbox'})).toBeInTheDocument();
    expect(getByRole('row', { name: 'user@test.com USER primary checkbox'})).toBeInTheDocument();
    expect(getByRole('row', { name: 'disabled@test.com USER primary checkbox'})).toBeInTheDocument();
})

test('should disabled checkbox if admin', () => {
    const mockXXXFn = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(mockXXXFn);

    const { getAllByRole } = render(<UserListPage />, {initialState: {user: REGULAR_STATE}});

    expect(getAllByRole('checkbox')[0]).toBeDisabled();
})


test('should enabled checkbox if not admin', () => {
    const mockXXXFn = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(mockXXXFn);

    const { getAllByRole } = render(<UserListPage />, {initialState: {user: REGULAR_STATE}});

    expect(getAllByRole('checkbox')[1]).not.toBeDisabled();
    expect(getAllByRole('checkbox')[2]).not.toBeDisabled();
})

test('should checked checkbox if user enabled', () => {
    const mockXXXFn = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(mockXXXFn);

    const { getAllByRole } = render(<UserListPage />, {initialState: {user: REGULAR_STATE}});

    expect(getAllByRole('checkbox')[0]).toHaveAttribute('checked');
})

test('should checked checkbox if user disabled', () => {
    const mockXXXFn = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(mockXXXFn);

    const { getAllByRole } = render(<UserListPage />, {initialState: {user: REGULAR_STATE}});

    expect(getAllByRole('checkbox')[2]).not.toHaveAttribute('checked');
})

// test('should checked checkbox if click on it when user disabled', () => {
//     const mockXXXFn = jest.fn();
//     const spyOnUseDispatch = jest
//       .spyOn(ReactRedux, 'useDispatch')
//       .mockReturnValue(mockXXXFn);
//     const spyOnSwitchEnabledUser = jest
//       .spyOn('../redux/userDuck', 'switchEnabledUser')
//       .mockReturnValue(mockXXXFn);

//     const { getAllByRole } = render(<UserListPage />, {initialState: {user: REGULAR_STATE}});

//     const checkbox = getAllByRole('checkbox')[2];
//     expect(checkbox).not.toHaveAttribute('checked');

//     fireEvent.click(checkbox);

//     expect(spyOnSwitchEnabledUser).toHaveBeenCalled();
//     expect(getAllByRole('test')[2]).toBeInTheDocument();
//     // expect(getAllByRole('checkbox')[2]).toHaveAttribute('checked');
// })

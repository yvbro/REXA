import React from 'react';
import {render, cleanup} from '../../../helpers/test/test-utils';
import '@testing-library/jest-dom/extend-expect';
import * as ReactRedux from 'react-redux';

import UsersManagementPage from "./UsersManagementPage";
import LoadingIndicator from '../../common/LoadingIndicator';
import UserListPage from '../smart/UserListPage';

afterEach(cleanup)

test('should take a snapshot', () => {
    const mockXXXFn = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockReturnValue(mockXXXFn);

    const { asFragment } = render(<UsersManagementPage />);

    expect(asFragment(<UsersManagementPage />)).toMatchSnapshot();
})

// test('should display LoadingIndicator if loading', () => {
//     const mockXXXFn = jest.fn();
//     const spyOnUseDispatch = jest
//       .spyOn(ReactRedux, 'useDispatch')
//       .mockReturnValue(mockXXXFn);
//     const spyOnUseSelector = jest
//       .spyOn(ReactRedux, 'useSelector')
//       .mockReturnValue(() => {user: {loading: true}});

//     const { container } = render(<UsersManagementPage />, {user: {loading: true}});

//     expect(container.firstChild).toMatchInlineSnapshot(`<LoadingIndicator />`);
// })

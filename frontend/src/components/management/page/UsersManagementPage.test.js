import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UsersManagementPage from "./UsersManagementPage";

configure({
    adapter: new Adapter()
});

describe('<UsersManagementPage />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<UsersManagementPage />);
    })

    it('should render a <UserListPage /> if not loading', () => {
        expect(wrapper.find(UserListPage)).toHaveLength(1);
    });

    it('should render a <LoadingIndicator /> if loading', () => {
        wrapper.setProps({});
        expect(wrapper.find(UserListPage)).toHaveLength(1);
    });
});

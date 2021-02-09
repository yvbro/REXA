import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoginPage from "./LoginPage";
import {Grid} from "@material-ui/core";

configure({
    adapter: new Adapter()
});

// describe('<LoginPage />', () => {
//     it('should render a <Grid /> if unauthenticated', () => {
//         const wrapper = shallow(<LoginPage />);
//         expect(wrapper.find(Grid)).toHaveLength(1);
//     });
// });

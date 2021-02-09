import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PrearchiveDashboard from "./PrearchiveDashboard";
import RexaDataTable from "../../common/RexaDataTable";

configure({
    adapter: new Adapter()
});

describe('<LoginPage />', () => {
    it('should render a <Grid /> if unauthenticated', () => {
        const wrapper = shallow(<PrearchiveDashboard />);
        expect(wrapper.find(RexaDataTable)).toHaveLength(1);
    });
});

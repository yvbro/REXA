import React from 'react';
import PropTypes from 'prop-types';

import style from '../common/common.module.scss';

const AppLayout = ({children}) => <div className={style.wrapper}>{children}</div>;

AppLayout.propTypes = {
    children: PropTypes.object.isRequired,
};
export default AppLayout;

import React from 'react';
import style from '../../components/common/common.module.scss';

const withLayout = (WrappedComponent) => {
    return props => (<div className={style.wrapper}><WrappedComponent /></div>);
};

export default withLayout;

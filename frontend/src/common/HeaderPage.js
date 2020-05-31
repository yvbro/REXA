import React from "react";
import PropTypes from 'prop-types';

import style from './common.module.scss';

const HeaderPage = (props) => {
    return (
        <div className={style.headerDiv}>
            <h3>{props.title}</h3>
        </div>
    );
};

HeaderPage.propTypes = {
    title: PropTypes.string.isRequired,
};

export default HeaderPage;


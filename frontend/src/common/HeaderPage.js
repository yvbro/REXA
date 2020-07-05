import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(() => ({
    title: {
        textAlign: 'center',
        paddingTop: '20px',
        height: '50px',
    },
}));

const HeaderPage = (props) => {
    const classes = useStyle();

    return <h1 className={classes.title}>{props.title}</h1>;
};

HeaderPage.propTypes = {
    title: PropTypes.string.isRequired,
};

export default HeaderPage;

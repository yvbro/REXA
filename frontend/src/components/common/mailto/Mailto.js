import React from 'react';
import PropTypes from 'prop-types';

const Mailto = ({ email, children }) => (<a href={`mailto:${email}`}>{children}</a>);

  Mailto.propTypes = {
    email: PropTypes.string.isRequired,
    children: PropTypes.string,
};

Mailto.defaultProps = {
    children: '',
};

export default Mailto;

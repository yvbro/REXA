import React from 'react';

import { Typography } from '@material-ui/core';

const PasswordRules = () => {
    return (
        <Typography
            data-testid="passwordRules"
            variant="caption"
            display="block"
            gutterBottom
        >
            The password must be 8 characters long. It should contain a capital
            letter and a number.
        </Typography>
    );
};

export default PasswordRules;

import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const PasswordField = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            required
            label={props.label}
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={props.value}
            error={!!props.error}
            helperText={props.error}
            onChange={props.onChange}
            className={props.className}
            inputProps={{
                form: {
                    autoComplete: 'off',
                },
                'data-testid': props.testId,
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={() => setShowPassword(!showPassword)}
                            data-testid="visibilityButton"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

PasswordField.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    testId: PropTypes.string, // for testing purposes
};

export default PasswordField;

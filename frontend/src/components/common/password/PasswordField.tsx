import React, { useState } from 'react';

import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface PasswordField {
    value: string;
    label: string;
    error: string;
    testId: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField = ({
    value,
    label,
    error,
    testId,
    onChange,
    className = '',
}: PasswordField) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            required
            label={label}
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={value}
            error={!!error}
            helperText={error}
            onChange={onChange}
            className={className}
            inputProps={{
                form: {
                    autoComplete: 'off',
                },
                'data-testid': testId,
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

export default PasswordField;

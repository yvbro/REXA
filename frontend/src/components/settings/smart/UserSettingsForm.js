import React, { useState } from 'react';

import { Card, Button, TextField, makeStyles, Typography } from '@material-ui/core';

import PasswordRules from '../../common/PasswordRules';

import { updateUserSettings } from '../api/apiSettings';
import classes from './XnatSettingsForm.module.scss';
import {
    ERROR_INVALID_PASSWORD,
    isPasswordInvalid,
} from '../../../helpers/constants';

const ERROR_PASSWORD = 'The entered value does not match the password you entered.';

const useStyles = makeStyles((theme) => ({
    card: {
        width: 400,
        height: 400,
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
    },
    input: {
        margin: theme.spacing(1),
        width: 350,
    },
}));

const UserSettingsForm = () => {
    const style = useStyles();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (newPassword !== confirmedNewPassword) {
            setErrorPassword(ERROR_PASSWORD);
        } else if (isPasswordInvalid(newPassword)) {
            setErrorPassword(ERROR_INVALID_PASSWORD);
        } else {
            setErrorPassword('');
            updateUserSettings(currentPassword, newPassword).then(() => {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmedNewPassword('');
            });
        }
    };

    return (
        <Card className={style.card}>
            <div className={classes.title}>
                <Typography variant="button">Change your ReXA password</Typography>
                <PasswordRules />
            </div>
            <form
                className={classes.formFlex}
                onSubmit={handleSubmit}
                key={'userSettingsForm'}
                id={'userSettingsForm'}
            >
                <TextField
                    id="CurrentPassword"
                    name="currentPassword"
                    label="current password"
                    type="password"
                    variant="outlined"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={style.input}
                    inputProps={{
                        form: {
                            autoComplete: 'off',
                        },
                    }}
                />
                <TextField
                    id="newPassword"
                    name="newPassword"
                    label="New password"
                    type="password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={style.input}
                    inputProps={{
                        form: {
                            autoComplete: 'off',
                        },
                    }}
                />
                <TextField
                    id="confirmedNewPassword"
                    name="confirmedNewPassword"
                    label="Confirm new password"
                    type="password"
                    variant="outlined"
                    value={confirmedNewPassword}
                    error={!!errorPassword}
                    onChange={(e) => setConfirmedNewPassword(e.target.value)}
                    className={style.input}
                    helperText={errorPassword}
                    inputProps={{
                        form: {
                            autoComplete: 'off',
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    disabled={
                        !currentPassword || !newPassword || !confirmedNewPassword
                    }
                    className={style.input}
                >
                    Save
                </Button>
            </form>
        </Card>
    );
};

export default UserSettingsForm;

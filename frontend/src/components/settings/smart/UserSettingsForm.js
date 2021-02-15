import React, { useState } from 'react';

import { Card, Button, TextField, makeStyles, Typography } from '@material-ui/core';

import PasswordRules from '../../common/PasswordRules';

import { updateUserSettings } from '../api/apiSettings';
import classes from './XnatSettingsForm.module.scss';
import {
    isPasswordTooShort,
    ERROR_PASSWORD_LENGTH,
    passwordDoesNotContainACapitalLetter,
    ERROR_PASSWORD_CAPITAL_LETTER,
    passwordDoesNotContainANumber,
    ERROR_PASSWORD_NUMBER,
    ERROR_PASSWORD_NOT_MATCH
} from '../../../helpers/constants';

const useStyles = makeStyles((theme) => ({
    card: {
        width: 400,
        height: 450,
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
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmationPassword, setErrorConfirmationPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (confirmationPassword !== newPassword) {
            setErrorConfirmationPassword(ERROR_PASSWORD_NOT_MATCH);
        } else {
            updateUserSettings(currentPassword, newPassword, confirmationPassword).then(() => {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmationPassword('');
            });
        }
    };

    const onChangePassword = (event) => {
        if (isPasswordTooShort(event.target.value)) {
            setErrorPassword(ERROR_PASSWORD_LENGTH);
        } else if (passwordDoesNotContainACapitalLetter(event.target.value)) {
            setErrorPassword(ERROR_PASSWORD_CAPITAL_LETTER);
        } else if (passwordDoesNotContainANumber(event.target.value)) {
            setErrorPassword(ERROR_PASSWORD_NUMBER);
        } else {
            setErrorPassword('');
        }

        setNewPassword(event.target.value);
    };

    const onChangeConfirmedPassword = (event) => {
        if (event.target.value !== newPassword) {
            setErrorConfirmationPassword('Password and confirmation does not match.');
        } else {
            setErrorConfirmationPassword('');
        }
        setConfirmationPassword(event.target.value);
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
                    error={!!errorPassword}
                    helperText={errorPassword}
                    value={newPassword}
                    onChange={onChangePassword}
                    className={style.input}
                    inputProps={{
                        form: {
                            autoComplete: 'off',
                        },
                    }}
                />
                <TextField
                    id="confirmationPassword"
                    name="confirmationPassword"
                    label="Confirm new password"
                    type="password"
                    variant="outlined"
                    error={!!errorConfirmationPassword}
                    helperText={errorConfirmationPassword}
                    value={confirmationPassword}
                    onChange={onChangeConfirmedPassword}
                    className={style.input}
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
                        !currentPassword || !newPassword || !confirmationPassword ||
                        errorPassword || errorConfirmationPassword
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

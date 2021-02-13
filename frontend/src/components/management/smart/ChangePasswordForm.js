import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    TextField,
    makeStyles,
    Avatar
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import PasswordRules from '../../common/PasswordRules';

import { updatePassword } from '../redux/userDuck';
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
    root: {
        margin: 'auto',
        paddingTop: 20,
        width: 500,
        height: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '16px',
    },
    text: {
        paddingBottom: 10,
        width: 400,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        width: 100,
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    iconDef: {
        fontSize: 50,
    },
}));

const ChangePasswordForm = (props) => {
    const classes = useStyles();

    const [newPassword, setNewPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmationPassword, setErrorConfirmationPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (confirmationPassword !== newPassword) {
            setErrorConfirmationPassword(ERROR_PASSWORD_NOT_MATCH);
        } else {
            updatePassword(props.userEmail, newPassword, confirmationPassword).then(() => {
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
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <EditIcon className={classes.iconDef} />
                    </Avatar>
                }
                title="Edit User password"
                titleTypographyProps={{ variant: 'button', color: 'primary' }}
                subheader={<PasswordRules />}
            />
            <CardContent className={classes.cardContent}>
                <TextField
                    className={classes.text}
                    id="newPassword"
                    name="newPassword"
                    label="New password"
                    type="password"
                    variant="outlined"
                    required
                    error={!!errorPassword}
                    helperText={errorPassword}
                    value={newPassword}
                    onChange={onChangePassword}
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
                    required
                    error={!!errorConfirmationPassword}
                    helperText={errorConfirmationPassword}
                    value={confirmationPassword}
                    onChange={onChangeConfirmedPassword}
                    inputProps={{
                        form: {
                            autoComplete: 'off',
                        },
                    }}
                />
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={handleSubmit}
                    color="primary"
                    disabled={
                        !newPassword || !confirmationPassword ||
                        !!errorPassword || !!errorConfirmationPassword}
                    className={classes.button}
                >
                    Save
                </Button>
                <Button
                    size="small"
                    onClick={props.cancelAction}
                    color="secondary"
                    className={classes.button}
                >
                    Cancel
                </Button>
            </CardActions>
        </Card>
    );
};

ChangePasswordForm.propTypes = {
    userEmail: PropTypes.string,
    cancelAction: PropTypes.func.isRequired,
};

export default ChangePasswordForm;

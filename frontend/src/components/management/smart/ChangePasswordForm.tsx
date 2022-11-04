import React, { useState } from 'react';

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    makeStyles,
    Avatar,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { toast } from 'react-toastify';
import PasswordRules from '../../common/password/PasswordRules';
import PasswordField from '../../common/password/PasswordField';

import {
    isPasswordTooShort,
    ERROR_PASSWORD_LENGTH,
    passwordDoesNotContainACapitalLetter,
    ERROR_PASSWORD_CAPITAL_LETTER,
    passwordDoesNotContainANumber,
    ERROR_PASSWORD_NUMBER,
    ERROR_PASSWORD_NOT_MATCH,
} from '../../../helpers/constants';

import themes from '../../common/theme/theme.scss';
import useUsersManagementService from '../../../services/useUsersManagementService';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        paddingTop: 20,
        width: 500,
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: themes.borderRadius,
    },
    header: {
        width: 430,
    },
    text: {
        paddingBottom: 10,
        width: 400,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    saveButton: {
        width: 120,
        backgroundColor: themes.primaryButtonColor,
        color: 'white',
    },
    cancelButton: {
        width: 120,
        backgroundColor: themes.secondaryButtonColor,
        color: 'white',
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        backgroundColor: themes.avatarColor,
    },
    iconDef: {
        fontSize: 50,
    },
}));

interface ChangePasswordFormProps {
    userEmail: string;
    closeAction: () => void;
}

function ChangePasswordForm({ userEmail, closeAction }: ChangePasswordFormProps) {
    const classes = useStyles();

    const { updatePassword } = useUsersManagementService();

    const [newPassword, setNewPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmationPassword, setErrorConfirmationPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (confirmationPassword !== newPassword) {
            setErrorConfirmationPassword(ERROR_PASSWORD_NOT_MATCH);
        } else {
            updatePassword({
                email: userEmail,
                newPassword,
                confirmationPassword,
            });
            closeAction();
        }
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const onChangeConfirmedPassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.value !== newPassword) {
            setErrorConfirmationPassword(
                'Password and confirmation does not match.'
            );
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
                title={`Edit password for ${userEmail}`}
                titleTypographyProps={{ variant: 'h6' }}
                subheader={<PasswordRules />}
                className={classes.header}
            />
            <CardContent className={classes.cardContent}>
                <PasswordField
                    value={newPassword}
                    label="New password"
                    error={errorPassword}
                    onChange={onChangePassword}
                    testId="newPassword"
                    className={classes.text}
                />
                <PasswordField
                    value={confirmationPassword}
                    label="Confirm new password"
                    error={errorConfirmationPassword}
                    onChange={onChangeConfirmedPassword}
                    testId="confirmationPassword"
                    className={classes.text}
                />
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                        !newPassword ||
                        !confirmationPassword ||
                        !!errorPassword ||
                        !!errorConfirmationPassword
                    }
                    className={classes.saveButton}
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    onClick={closeAction}
                    className={classes.cancelButton}
                >
                    Cancel
                </Button>
            </CardActions>
        </Card>
    );
}

export default ChangePasswordForm;

import React, { useState } from 'react';
import {
    TextField,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Button,
    makeStyles,
    Avatar,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import PasswordRules from '../../common/password/PasswordRules';
import PasswordField from '../../common/password/PasswordField';

import {
    regexEmail,
    isPasswordTooShort,
    ERROR_PASSWORD_LENGTH,
    passwordDoesNotContainACapitalLetter,
    ERROR_PASSWORD_CAPITAL_LETTER,
    passwordDoesNotContainANumber,
    ERROR_PASSWORD_NUMBER,
} from '../../../helpers/constants/index';

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
    addButton: {
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

interface AddUserFormProps {
    users: string[];
    closeAction: () => void;
}

function AddUserForm({ users, closeAction }: AddUserFormProps) {
    const classes = useStyles();

    const { addUser } = useUsersManagementService();

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email) {
            setErrorEmail('Email must be set.');
        } else if (!password) {
            setErrorPassword('Password must be set.');
        } else {
            await addUser({ email, password });
            closeAction();
        }
    };

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (users.includes(event.target.value)) {
            setErrorEmail('Email already used');
        } else if (event.target.value.match(regexEmail)) {
            setErrorEmail('');
        } else {
            setErrorEmail('Email invalid');
        }
        setEmail(event.target.value);
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
        setPassword(event.target.value);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <AccountCircleIcon className={classes.iconDef} />
                    </Avatar>
                }
                title="Add New User"
                titleTypographyProps={{ variant: 'h6' }}
                subheader={<PasswordRules />}
                className={classes.header}
            />
            <CardContent className={classes.cardContent}>
                <TextField
                    className={classes.text}
                    required
                    label="User email"
                    variant="outlined"
                    value={email}
                    error={!!errorEmail}
                    helperText={errorEmail}
                    onChange={onChangeEmail}
                    inputProps={{ 'data-testid': 'email' }}
                />
                <PasswordField
                    value={password}
                    label="Password"
                    error={errorPassword}
                    onChange={onChangePassword}
                    testId="password"
                />
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!!errorEmail || !!errorPassword}
                    className={classes.addButton}
                >
                    Add
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

export default AddUserForm;

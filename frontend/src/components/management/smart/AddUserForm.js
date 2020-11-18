import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';

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

import { addUser } from '../redux/userDuck';
import { regexEmail } from '../../../helpers/constants/index';


const useStyles = makeStyles({
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
});

const AddUserForm = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email) {
            setErrorEmail('Email must be set.');
        } else if (!password) {
            setErrorPassword('Password must be set.');
        } else {
            dispatch(addUser(email, password)).then(() => props.cancelAction());
        }
    };

    const onChangeEmail = (event) => {
        if (props.users.includes(event.target.value)) {
            setErrorEmail('Email already used');
        } else if (event.target.value.match(regexEmail)) {
            setEmail(event.target.value);
            setErrorEmail('');
        } else {
            setErrorEmail('Email invalid');
        }
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <AccountCircleIcon />
                    </Avatar>
                }
                title="Add new user"
            />
            <CardContent className={classes.cardContent}>
                <TextField
                    className={classes.text}
                    required
                    label="User email"
                    variant="outlined"
                    error={!!errorEmail}
                    helperText={errorEmail}
                    onChange={onChangeEmail}
                />
                <TextField
                    required
                    label="Password"
                    type="password"
                    variant="outlined"
                    error={!!errorPassword}
                    helperText={errorPassword}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={handleSubmit}
                    color="primary"
                    disabled={errorEmail}
                    className={classes.button}
                >
                    Add
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

AddUserForm.propTypes = {
    users: PropTypes.array.isRequired,
    cancelAction: PropTypes.func.isRequired,
};

export default AddUserForm;

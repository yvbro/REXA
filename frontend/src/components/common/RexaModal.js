import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';

import {
    Modal,
    Card,
    CardContent,
    CardHeader,
    TextField,
    CardActions,
    Button,
    makeStyles,
    Avatar,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { addUser } from '../management/redux/userDuck';

import { regexEmail } from '../../helpers/constants/index';

const useStyles = makeStyles({
    root: {
        margin: 'auto',
        paddingTop: 20,
        width: 400,
        height: 450,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '16px',
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    text: {
        paddingBottom: 10,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
});

const RexaModal = (props) => {
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
            dispatch(addUser(email, password)).then(() => props.closeModal());
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
        <Modal
            className={classes.modal}
            open={props.open}
            onClose={props.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            <AccountCircleIcon />
                        </Avatar>
                    }
                    title="Add new user"
                    subheader="Fill an email and password and click add"
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
                    >
                        Add
                    </Button>
                    <Button
                        size="small"
                        onClick={props.closeModal}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
};

RexaModal.propTypes = {
    /*children: PropTypes.array,*/
    open: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    addAction: PropTypes.func,
    closeModal: PropTypes.func.isRequired,
};

export default RexaModal;

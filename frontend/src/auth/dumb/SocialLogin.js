import React from 'react'

import {Button, makeStyles, Icon} from "@material-ui/core";

import {GOOGLE_AUTH_URL} from '../../constants';
import googleLogo from '../../assets/google-logo.png';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        width: 350,
    },
    imageIcon: {
        height: '100%'
    },
    iconRoot: {
        textAlign: 'center'
    }
}));

const GoogleIcon = () => {
    const classes = useStyles();
    return (
        <Icon classes={{root: classes.iconRoot}}>
            <img className={classes.imageIcon} src={googleLogo} alt="Google"/>
        </Icon>)
};

const SocialLogin = () => {
    const classes = useStyles();

    return (
        <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            href={GOOGLE_AUTH_URL}
            startIcon={<GoogleIcon/>}
        >
            Sign in with Google
        </Button>
    )
};

export default SocialLogin;

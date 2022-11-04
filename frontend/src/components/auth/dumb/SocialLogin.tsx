import React from 'react';

import { Button, makeStyles, Icon } from '@material-ui/core';

import { GOOGLE_AUTH_URL } from '../../../helpers/constants';
import googleLogo from '../../../assets/google-logo.png';
import classes from './auth.module.scss';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        width: 350,
    },
}));

export function GoogleIcon() {
    return (
        <Icon classes={{ root: classes.iconRoot }}>
            <img className={classes.imageIcon} src={googleLogo} alt="Google" />
        </Icon>
    );
}

function SocialLogin() {
    const style = useStyles();

    return (
        <Button
            variant="outlined"
            color="primary"
            className={style.button}
            href={GOOGLE_AUTH_URL}
            startIcon={<GoogleIcon />}
        >
            Sign in with Google
        </Button>
    );
}

export default SocialLogin;

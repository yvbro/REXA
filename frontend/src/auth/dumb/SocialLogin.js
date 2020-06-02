import React from 'react'

import {GOOGLE_AUTH_URL} from '../../constants';
import googleLogo from '../../assets/google-logo.png';

import style from './auth.module.scss';

const SocialLogin = () => (
    <div>
        <a className={`btn btn-block ${style.socialBtn}`} style={{border: "1px solid #e1e4e7", borderRadius: "5px"}} href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google" className={style.socialBtnImg}/> Sign in with Google
        </a>
    </div>
);

export default SocialLogin;

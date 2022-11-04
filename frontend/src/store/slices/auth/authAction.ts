import axios, { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN, EXPIRATION_DATE } from '../../../helpers/constants';
import { RexaException } from '../../../models/management/RexaException';
import { AppDispatch } from '../../store';
import { errorLogin, login, logout, TokenInfo } from './authSlice';

type AuthResponse = {
    token: string;
    tokenType: string;
};

interface TokenDto {
    foo: string;
    exp: number;
    iat: number;
}

const getExpirationDate = (token: string) => {
    const decoded = jwt_decode<TokenDto>(token);
    return decoded.exp;
};

const getExpirationTime = (expirationDate: number) => {
    return expirationDate - new Date().getTime() / 1000;
};

export const extractPayload = (token: string) => {
    const decoded = jwt_decode<TokenInfo>(token);
    return {
        token,
        username: decoded.username,
        xnatUser: decoded.xnatUser,
        xnatHost: decoded.xnatHost,
        isAdmin: decoded.isAdmin,
        authProvider: decoded.authProvider,
    };
};

export const checkAuthTimeout =
    (expirationTime: number) => (dispatch: AppDispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };

export const performLogin =
    (email: string, password: string) => (dispatch: AppDispatch) => {
        const authData = {
            email,
            password,
        };

        axios
            .post<AuthResponse>('/auth/login', authData)
            .then((response) => {
                const expirationDate = getExpirationDate(response.data.token);
                localStorage.setItem(ACCESS_TOKEN, response.data.token);
                localStorage.setItem(EXPIRATION_DATE, expirationDate.toString());
                dispatch(login(extractPayload(response.data.token)));
                dispatch(checkAuthTimeout(getExpirationTime(expirationDate)));
                toast.info('Welcome ro Rexa');
            })
            .catch((error: AxiosError<RexaException>) => {
                let errorMessage = error?.response?.data?.message;
                if (!errorMessage || errorMessage !== 'User is disabled') {
                    errorMessage = 'Invalid username or password';
                }
                toast.error(errorMessage);
                dispatch(errorLogin(errorMessage));
            });
    };

export const performLogout = () => (dispatch: AppDispatch) => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(EXPIRATION_DATE);
    dispatch(logout());
    axios.post('/auth/logout');
};

export const authCheckState = () => (dispatch: AppDispatch) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = localStorage.getItem(EXPIRATION_DATE);
        if (Number(expirationDate) <= new Date().getTime() / 1000) {
            dispatch(logout());
        } else {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            dispatch(login(extractPayload(accessToken ?? '')));
            dispatch(checkAuthTimeout(getExpirationTime(Number(expirationDate))));
        }
    }
};

import axios from 'axios';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

import { fulfilled, pending, rejected } from '../../../helpers/promise';
import { ACCESS_TOKEN, EXPIRATION_DATE } from '../../../helpers/constants';

const initialState = {
    token: null,
    user: {
        username: null,
        xnatHost: null,
        xnatUser: null,
        isAdmin: false,
    },
    loading: false,
    error: null,
};

const LOGIN = '[Auth] LOGIN';
const LOGOUT = '[Auth] LOGOUT';
const UPDATE_XNAT_INFO = '[Auth] UPDATE XNAT INFO';

export default function auth(state = initialState, action) {
    switch (action.type) {
        case pending(LOGIN):
            return {
                ...state,
                loading: true,
                error: null,
            };
        case fulfilled(LOGIN):
            return {
                ...state,
                token: action.payload.token,
                user: {
                    username: action.payload.username,
                    xnatHost: action.payload.xnatHost,
                    xnatUser: action.payload.xnatUser,
                    isAdmin: action.payload.isAdmin,
                },
                loading: false,
                error: null,
            };
        case rejected(LOGIN):
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                user: {
                    username: null,
                    xnatHost: null,
                    xnatUser: null,
                    isAdmin: false,
                },
            };
        case UPDATE_XNAT_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    xnatUser: action.xnatUser,
                    xnatHost: action.xnatHost,
                },
            };
        default:
            return state;
    }
}

export const loginSuccess = (payload) => {
    return {
        type: fulfilled(LOGIN),
        payload: payload
    };
};

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(EXPIRATION_DATE);
    return {
        type: LOGOUT
    };
};

export const performLogin = (email, password) => {
    return dispatch => {
        dispatch({type: pending(LOGIN)});
        const authData = {
            email: email,
            password: password
        };
        
        axios.post('/auth/login', authData)
            .then(response => {
                const expirationDate = getExpirationDate(response.data.token);
                localStorage.setItem(ACCESS_TOKEN, response.data.token);
                localStorage.setItem(EXPIRATION_DATE, expirationDate);
                dispatch(loginSuccess(extractPayload(response.data.token)));
                dispatch(checkAuthTimeout(getExpirationTime(expirationDate)));
                toast.info('Welcome ro Rexa');
            })
            .catch(error => {
                let errorMessage = error?.response?.data?.message;
                if (!errorMessage || errorMessage !== "User is disabled") {
                    errorMessage = "Invalid username or password";
                }
                toast.error(errorMessage);
                dispatch({type: rejected(LOGIN), "error": errorMessage});
            });
    };
};

export const performLogout = () => dispatch => {
        dispatch(logout());
        axios.post('/auth/logout');
    };

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = localStorage.getItem(EXPIRATION_DATE);
            if (expirationDate <= new Date().getTime()/1000) {
                dispatch(logout());
            } else {
                const token = localStorage.getItem(ACCESS_TOKEN);
                dispatch(loginSuccess(extractPayload(token)));
                dispatch(checkAuthTimeout(getExpirationTime(expirationDate)));
            }   
        }
    };
};

export const updateCurrentUserXnatInfos = (xnatUser, xnatHost) => (dispatch) =>
    dispatch({
        type: UPDATE_XNAT_INFO,
        xnatUser: xnatUser,
        xnatHost: xnatHost,
    });

export const extractPayload = token => {
    var decoded = jwt_decode(token);
    return {
        token: token,
        username: decoded.username,
        xnatUser: decoded.xnatUser,
        xnatHost: decoded.xnatHost,
        isAdmin: decoded.isAdmin,
    };
}

const getExpirationDate = token => {
    var decoded = jwt_decode(token);
    return decoded.exp;
}

const getExpirationTime = expirationDate => {
    return expirationDate - new Date().getTime()/1000;
}
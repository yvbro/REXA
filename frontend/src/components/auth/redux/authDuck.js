import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import { fulfilled, pending, rejected } from '../../../helpers/promise';

const initialState = {
    authenticated: false,
    currentUser: null,
    isAdmin: false,
    loading: false,
};

const LOGIN = '[Auth] LOGIN';
const LOGOUT = '[Auth] LOGOUT';
const FETCH_USER = '[Auth] FETCH_USER';

export default function auth(state = initialState, action) {
    switch (action.type) {
        case pending(LOGIN):
            return {
                ...state,
                authenticated: false,
                currentUser: null,
                isAdmin: false,
                loading: true,
            };
        case fulfilled(LOGIN):
            return {
                ...state,
                authenticated: true,
                currentUser: action.payload.data,
                isAdmin: isAdmin(action.payload.data.roles),
                loading: false,
            };
        case rejected(LOGIN):
            return {
                ...state,
                authenticated: false,
                currentUser: null,
                isAdmin: false,
                loading: false,
            };
        case pending(LOGOUT):
            return {
                ...state,
                authenticated: state.authenticated,
                currentUser: state.currentUser,
                isAdmin: false,
                loading: true,
            };
        case fulfilled(LOGOUT):
            return {
                ...state,
                authenticated: false,
                currentUser: null,
                isAdmin: false,
                loading: false,
            };
        case rejected(LOGOUT):
            return {
                ...state,
                authenticated: state.authenticated,
                currentUser: state.currentUser,
                isAdmin: state.isAdmin,
                loading: false,
            };
        case pending(FETCH_USER):
            return {
                ...state,
                authenticated: state.authenticated,
                currentUser: state.currentUser,
                isAdmin: state.isAdmin,
                loading: true,
            };
        case fulfilled(FETCH_USER):
            return {
                ...state,
                authenticated: true,
                currentUser: action.payload.data,
                isAdmin: isAdmin(action.payload.data.roles),
                loading: false,
            };
        case rejected(FETCH_USER):
            return {
                ...state,
                authenticated: false,
                currentUser: null,
                isAdmin: false,
                loading: false,
            };
        default:
            return state;
    }
}

function isAdmin(authorities) {
    return authorities.includes( 'ADMIN')
}

export const performLogin = (email, password) => (dispatch) =>
    dispatch({
        type: LOGIN,
        payload: axios.post('/auth/login', {
            email: email,
            password: password,
        }),
    });

export const performLogout = () => (dispatch) =>
    dispatch({
        type: LOGOUT,
        payload: axios.post('/auth/logout'),
    });

export const getCurrentUser = () => (dispatch) =>
    dispatch({
        type: FETCH_USER,
        payload: axios.get('/auth/userinfo'),
    });

import axios from 'axios';

import { toast } from 'react-toastify';

import { fulfilled, pending, rejected } from '../../../helpers/promise';

const DEFAULT_ROLES = ['USER'];
const initialState = {
    data: [],
    loading: false,
};

const setEnabledForUser = (data, userEmail, enabled) => {
    for (const i in data) {
        if (data[i].email === userEmail) {
            data[i].enabled = enabled;
            break;
        }
    }
    return data;
};

const addNewUser = (data, userEmail) => {
    data.push({ email: userEmail, enabled: false, roles: DEFAULT_ROLES });
    return data;
};

const removeNewUser = (data, userEmail) => data.filter((user) => user.email !== userEmail);

const FETCH_USERS = '[User] FETCH LIST OF USERS';
const SWITCH_ENABLED_USER = '[User] EDIT ENABLED USER';
const ADD_USER = '[User] ADD USER';

export default function project(state = initialState, action) {
    switch (action.type) {
        case pending(FETCH_USERS):
            return {
                ...state,
                data: [],
                loading: true,
            };
        case fulfilled(FETCH_USERS):
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case rejected(FETCH_USERS):
            return {
                ...state,
                data: state.data,
                loading: false,
            };
        case pending(SWITCH_ENABLED_USER):
            return {
                ...state,
                data: setEnabledForUser(
                    state.data,
                    action.payload.userEmail,
                    action.payload.enabled
                ),
                loading: false,
            };
        case rejected(SWITCH_ENABLED_USER):
            return {
                ...state,
                data: setEnabledForUser(
                    state.data,
                    action.payload.userEmail,
                    !action.payload.enabled
                ),
                loading: false,
            };
        case pending(ADD_USER):
            return {
                ...state,
                data: addNewUser(state.data, action.payload),
                loading: false,
            };
        case rejected(ADD_USER):
            return {
                ...state,
                data: removeNewUser(state.data, action.payload),
                loading: false,
            };
        default:
            return state;
    }
}

export const fetchUsers = () => (dispatch) =>
    dispatch({
        type: FETCH_USERS,
        payload: axios.get('/private/management/users'),
    });

export const switchEnabledUser = (userEmail, enabled) => (dispatch) => {
    const param = { userEmail: userEmail, enabled: enabled };

    dispatch({
        type: pending(SWITCH_ENABLED_USER),
        payload: param,
    });

    return axios
        .post(`/private/management/users/switch`, param)
        .then(() => toast.info('Changes saved!'))
        .catch(() => {
            dispatch({
                type: rejected(SWITCH_ENABLED_USER),
                payload: param,
            });
            toast.error('Your changes could not be saved.');
        });
};

export const addUser = (email, password) => (dispatch) => {
    const param = { email: email, password: password };

    dispatch({
        type: pending(ADD_USER),
        payload: email,
    });

    return axios
        .post(`/private/management/users/add`, param)
        .then(() => toast.info('User added!'))
        .catch(() => {
            dispatch({
                type: rejected(ADD_USER),
                payload: email,
            });
            toast.error('User could not be added.');
        });
};

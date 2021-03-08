import axios from 'axios';

import { toast } from 'react-toastify';
import _get from 'lodash/get';

import { fulfilled, pending, rejected } from '../../../helpers/promise';

const DEFAULT_ROLES = ['USER'];
const initialState = {
    data: [],
    totalElements: 0,
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

export const FETCH_USERS = '[User] FETCH LIST OF USERS';
export const SWITCH_ENABLED_USER = '[User] EDIT ENABLED USER';
export const ADD_USER = '[User] ADD USER';

export default function project(state = initialState, action) {
    switch (action.type) {
        case pending(FETCH_USERS):
            return {
                ...state,
                data: state.data,
                totalElements: state.totalElements,
                loading: true,
            };
        case fulfilled(FETCH_USERS):
            return {
                ...state,
                data: action.payload.data.content,
                totalElements: action.payload.data.totalElements,
                loading: false,
            };
        case rejected(FETCH_USERS):
            return {
                ...state,
                data: state.data,
                totalElements: state.totalElements,
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
        case ADD_USER:
            return {
                ...state,
                data: [...state.data, { email: action.payload, enabled: false, roles: DEFAULT_ROLES }],
                loading: false,
            };
        default:
            return state;
    }
}

export const fetchUsers = (page, size) => (dispatch) =>  {

    const sizeQuery = size ? `&size=${size}` : ''

    const request = `/private/management/users/page?page=${page}${sizeQuery}`

    dispatch({
        type: FETCH_USERS,
        payload: axios.get(request),
    });
}

export const switchEnabledUser = (userEmail, enabled) => (dispatch) => {
    const param = { userEmail: userEmail, enabled: enabled };

    dispatch({
        type: pending(SWITCH_ENABLED_USER),
        payload: param,
    });

    return axios
        .post('/private/management/users/switch', param)
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

    return axios
        .post('/private/management/users/add', param)
        .then(() => {
            dispatch({
                type: ADD_USER,
                payload: email,
            });
            toast.info('User added!');
        })
        .catch((error) => {
            let errorMessage = _get(error, 'response.data.message', null);
            toast.error(errorMessage);
        });
};


export const updatePassword = async (userEmail, newPassword, confirmationPassword) => {
    const param = { email: userEmail, newPassword: newPassword, confirmationPassword: confirmationPassword};

    try {
        await axios
            .post('/private/management/users/edit', param);
        toast.info('Password edited!');
    } catch (error) {
        let errorMessage = _get(error, 'response.data.message', null);
        toast.error(`Password not changed: ${errorMessage}`);
    }
};

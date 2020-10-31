import axios from 'axios';

import {toast} from 'react-toastify';

import {fulfilled, pending, rejected} from '../../helpers/promise';

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

const FETCH_USERS = '[User] FETCH LIST OF USERS';
const SWITCH_ENABLED_USER = '[User] EDIT ENABLED USER';

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
                loading: state.loading,
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
    const param = {userEmail: userEmail, enabled: enabled};

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

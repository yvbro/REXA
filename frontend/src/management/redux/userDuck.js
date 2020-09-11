import axios from 'axios';

import { fulfilled, pending, rejected } from '../../helpers/promise';

const initialState = {
    users: {
        data: [],
        loading: false,
    },
};

const FETCH_USERS = '[Auth] FETCH LIST OF USERS';

export default function project(state = initialState, action) {
    switch (action.type) {
        case pending(FETCH_USERS):
            return {
                ...state,
                users: {
                    data: [],
                    loading: true,
                },
            };
        case fulfilled(FETCH_USERS):
            return {
                ...state,
                users: {
                    data: action.payload.data,
                    loading: false,
                },
            };
        case rejected(FETCH_USERS):
            return {
                ...state,
                users: {
                    data: state.user.data,
                    loading: false,
                },
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

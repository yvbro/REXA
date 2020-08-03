import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import { fulfilled, pending, rejected } from '../../helpers/promise';
import { toast } from 'react-toastify';

const initialState = {
    xnatUser: '',
    xnatHost: '',
    loading: false,
};

const FETCH_SETTINGS = '[Auth] FETCH SETTINGS';

export default function settings(state = initialState, action) {
    switch (action.type) {
        case pending(FETCH_SETTINGS):
            return {
                ...state,
                xnatUser: '',
                xnatHost: '',
                loading: true,
            };
        case fulfilled(FETCH_SETTINGS):
            return {
                ...state,
                xnatUser: action.payload.data.xnatUsername,
                xnatHost: action.payload.data.xnatHost,
                loading: false,
            };
        case rejected(FETCH_SETTINGS):
            return {
                ...state,
                xnatUser: state.xnatUser,
                xnatHost: state.xnatHost,
                loading: false,
            };
        default:
            return state;
    }
}

export const fetchSettings = () => (dispatch) =>
    dispatch({
        type: FETCH_SETTINGS,
        payload: axios.get('/private/settings'),
    });

export const updateSettings = (xnatUsername, xnatHost, xnatPassword) => {
    const response = axios
        .post('/private/settings', { xnatUsername, xnatHost, xnatPassword })
        .then(() => {
            toast.info('Settings saved');
        })
        .catch(() => {
            toast.error('Failed to save settings');
        });

    return response.data;
};

export const testConnection = (xnatUsername, xnatHost, xnatPassword) => {
    axios
        .post('/private/test', { xnatUsername, xnatHost, xnatPassword })
        .then(() => {
            toast.info('Succesfully connected to Xnat');
        })
        .catch(() => {
            toast.error('Connection failed');
        });
};

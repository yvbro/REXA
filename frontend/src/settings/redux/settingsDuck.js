import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import {fulfilled, pending, rejected} from '../../helpers/promise';

const initialState = {
    xnatUser: '',
    xnatHost: '',
    loading: false,
};

const FETCH_SETTINGS = "[Auth] FETCH SETTINGS";

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
                xnatUser: action.payload.data.xnat_username,
                xnatHost: action.payload.data.xnat_url,
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
            return state
    }
}

export const fetchSettings = () => dispatch =>
    dispatch({
        type: FETCH_SETTINGS,
        payload: axios.get("/private/settings")
    });

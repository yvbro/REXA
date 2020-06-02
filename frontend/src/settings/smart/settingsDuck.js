import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import {fulfilled, pending, rejected} from '../../helpers/promise';

const initialState = {
    settings: {
        data: [],
        loading: false,
    }
};

const FETCH_SETTINGS = "[Auth] FETCH SETTINGS";

export default function project(state = initialState, action) {
    switch (action.type) {
        case pending(FETCH_SETTINGS):
            return {
                ...state,
                settings: {
                    data: [],
                    loading: true,
                }
            };
        case fulfilled(FETCH_SETTINGS):
            return {
                ...state,
                settings: {
                    data: action.payload.data,
                    loading: false,
                }
            };
        case rejected(FETCH_SETTINGS):
            return {
                ...state,
                settings: {
                    data: state.projectsList.data,
                    loading: false,
                }
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

import axios from 'axios';

import { fulfilled, pending, rejected } from '../../../helpers/promise';

const initialState = {
    recentActivities: {
        data: [],
        loading: false,
    },
    preArchives: {
        data: [],
        loading: false,
    },
};

const FETCH_RECENT_ACTIVITIES = '[dashboard] FETCH RECENT ACTIVITIES';
const FETCH_PRE_ARCHIVE = '[dashboard] FETCH PRE ACHIVE';

export default function dashboard(state = initialState, action) {
    switch (action.type) {
        case pending(FETCH_RECENT_ACTIVITIES):
            return {
                ...state,
                recentActivities: {
                    data: [],
                    loading: true,
                },
            };
        case fulfilled(FETCH_RECENT_ACTIVITIES):
            return {
                ...state,
                recentActivities: {
                    data: action.payload.data,
                    loading: false,
                },
            };
        case rejected(FETCH_RECENT_ACTIVITIES):
            return {
                ...state,
                recentActivities: {
                    data: state.recentActivities.data,
                    loading: false,
                },
            };
        case pending(FETCH_PRE_ARCHIVE):
            return {
                ...state,
                preArchives: {
                    data: [],
                    loading: true,
                },
            };
        case fulfilled(FETCH_PRE_ARCHIVE):
            return {
                ...state,
                preArchives: {
                    data: action.payload.data,
                    loading: false,
                },
            };
        case rejected(FETCH_PRE_ARCHIVE):
            return {
                ...state,
                preArchives: {
                    data: state.preArchives.data,
                    loading: false,
                },
            };
        default:
            return state;
    }
}

export const fetchRecentActivities = () => (dispatch) =>
    dispatch({
        type: FETCH_RECENT_ACTIVITIES,
        payload: axios.get('/private/recentActivities'),
    });

export const fetchPreAchives = () => (dispatch) =>
    dispatch({
        type: FETCH_PRE_ARCHIVE,
        payload: axios.get('/private/preArchives'),
    });

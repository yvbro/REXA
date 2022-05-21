import { XnatInfo } from '../../../models/xnat/XnatInfo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../models/auth/User';
import { TokenInfo } from './authAction';

interface AuthState {
    user: User;
    token: string | null;
    authProvider: string | null;
    loading: boolean;
    error: string;
}

const initialState: AuthState = {
    token: null,
    authProvider: null,
    user: {
        username: null,
        xnatHost: null,
        xnatUser: null,
        isAdmin: false,
    },
    loading: false,
    error: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<TokenInfo>) => {
            state.token = action.payload.token;
            state.authProvider = action.payload.authProvider;
            state.user.username = action.payload.username;
            state.user.xnatHost = action.payload.xnatHost;
            state.user.xnatUser = action.payload.xnatUser;
            state.user.isAdmin = action.payload.isAdmin;
        },
        errorLogin: (state, action: PayloadAction<string>) => {
            state = { ...state, error: action.payload };
        },
        logout: (state) => {
            state = initialState;
        },
        updateXnatInfo: (state, action: PayloadAction<XnatInfo>) => {
            state.user.xnatHost = action.payload.xnatHost;
            state.user.xnatUser = action.payload.xnatUser;
        },
    },
});

export const { login, errorLogin, logout, updateXnatInfo } = authSlice.actions;

export default authSlice;

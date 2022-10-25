import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/authSlice';
import projectSlice from './slices/project/projectSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        project: projectSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

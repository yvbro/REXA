import { combineReducers } from 'redux';
import auth from '../auth/redux/authDuck';
import project from '../project/redux/projectDuck';
import settings from '../settings/redux/settingsDuck';
import dashboard from '../dashboard/redux/dashboardDuck';
import user from '../management/redux/userDuck';

const appReducer = combineReducers({
    auth,
    project,
    settings,
    dashboard,
    user,
});

const rootReducer = (state, action) => {
    if (action.type === 'SUCCESS_LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;

import { combineReducers } from 'redux';
import auth from '../components/auth/redux/authDuck';
import project from '../components/project/redux/projectDuck';
import dashboard from '../components/dashboard/redux/dashboardDuck';
import user from '../components/management/redux/userDuck';

const appReducer = combineReducers({
    auth,
    project,
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

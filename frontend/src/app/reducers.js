import { combineReducers } from "redux";
import auth from "../auth/authDuck";
import xnat from "../xnat/xnatDuck";

const appReducer = combineReducers({
  auth,
  xnat,
});

const rootReducer = (state, action) => {
  if (action.type === "SUCCESS_LOGOUT") {
    state = undefined
  }

  return appReducer(state, action)
};

export default rootReducer

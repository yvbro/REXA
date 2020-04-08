import axios from 'axios';

const initialState = {
  isLogged: false,
};
const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';

export default function auth(state = initialState, action) {
  switch (action.type) {
  case SUCCESS_LOGIN:
    return {...state, isLogged: true};
  default:
    return state
  }
}

export function performLogin(account) {

  return dispatch =>
    axios
      .post('/login', {
        email: account.email,
        password: account.password
      })
      .then( () =>  {
        return dispatch({type: SUCCESS_LOGIN});
      });
}


import axios from 'axios';

const initialState = {
  isLogged: false,
};
const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
const FAILED_LOGIN = 'LOGIN_FAILED';

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
      })
      .catch(error => {
        console.log(error.message);
        return dispatch({type: FAILED_LOGIN})
      });
}

export function getCurrentUser(){
  return dispatch =>
      axios
          .get("/mono/user/current")
          .then( () =>  {
            return dispatch({type: SUCCESS_LOGIN});
          });
}


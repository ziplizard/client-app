import { checkHttpStatus, checkLicense, parseJSON } from '../utils';
import { LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER } from '../constants';
import jwtDecode from 'jwt-decode';

export function loggedIn() {
  return !!localStorage.token
}

export function loginUserSuccess(response) {
  let payload = jwtDecode(response.token);
  response.orgid = payload.orgid;
  localStorage.setItem('auth', JSON.stringify(response));
  return {
    type: LOGIN_USER_SUCCESS,
    payload: response
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('auth');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
  localStorage.removeItem('auth');
  return {
    type: LOGOUT_USER
  }
}

export function loginUser(email, password) {
  return fetch('http://localhost:8088/connect', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({username: email, password: password})
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(checkLicense)
    .then(response => {
      if (undefined === response.parseUrl) {
        throw('Invalid crm authentication');
      }
      return response;
    }).catch((e) => {
      let txt = 'Invalid idm authentication';
      if (e === 'Invalid crm authentication') {
        txt = e;
      }
      throw({
        response: {
          status: 403,
          statusText: txt
        }
      });
    });
}

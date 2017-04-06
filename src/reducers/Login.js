import {createReducer} from '../utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER} from '../constants';

const initialState = {
  payload: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    });
  },
  [LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'payload': payload,
      'statusText': 'You have been successfully logged in.'
    });
  },
  [LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'payload': null,
      'statusText': `${payload.statusText}`
    });
  },
  [LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'payload': null,
      'statusText': 'You have been successfully logged out.'
    });
  }
});
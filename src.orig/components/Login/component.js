import config from 'electron-json-config';
import jwtDecode from 'jwt-decode';

// Init reduxHelper
import reduxHelper from '../../utils/reduxHelper.js';
const reduxUtil = reduxHelper('Login');

// Include component
import component from './Login.js';

// Action Definitions
const LOGIN_USER_REQUEST = reduxUtil.defineAction('LOGIN_USER_REQUEST');
const LOGIN_USER_FAILURE = reduxUtil.defineAction('LOGIN_USER_FAILURE');
const LOGIN_USER_SUCCESS = reduxUtil.defineAction('LOGIN_USER_SUCCESS');

// Initial State
const initialState = {
  // get this from config file (second parameter is the default value if not found)
  emailInput: config.get('Login.email', ''),
  passwordInput: config.get('Login.password', '')
};

import { checkHttpStatus, parseJSON, checkLicense } from '../../utils/fetchHelper.js';

// Make Actions
const actions = {
  loginUserRequest: reduxUtil.createAction(LOGIN_USER_REQUEST),
  loginUserFailure: function() {
    localStorage.removeItem('auth');
    return reduxUtil.createAction(LOGIN_USER_FAILURE)
  },
  loginUserSuccess: function(response) {
    let payload = jwtDecode(response.token);
    response.orgid = payload.orgid;
    localStorage.setItem('auth', JSON.stringify(response));
    return reduxUtil.createAction(LOGIN_USER_SUCCESS)
  },
  loginUser: function(state) {
    console.log('========== state ==============', state);
    let url = process.env.CRM_API_URL || 'http://localhost:8088/connect';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({username: state.email, password: state.password})
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(checkLicense)
      .then(response => {
        if (undefined === response.orgid || undefined === response.crmUserId) {
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
};

// Make reducer
const reducer = reduxUtil.createReducer({
  [LOGIN_USER_REQUEST]: function(state, action) {
    let newState = { ...state, ...action.payload };
    return newState;
  },
  [LOGIN_USER_FAILURE]: function(state, action) {
    let newState = { ...state, ...action.payload };
    return newState;
  },
  [LOGIN_USER_SUCCESS]: function(state, action) {
    let newState = { ...state, ...action.payload };
    return newState;
  }
}, initialState);

// Export
export {
  component,
  actions,
  reducer
};

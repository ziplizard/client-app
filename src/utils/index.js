import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer
        ? reducer(state, action.payload)
        : state;
  };
}

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function parseJSON(response) {
  return response.json()
}

export function checkLicense(json) {
  return new Promise((resolve, reject) => {
    let cap = jwtDecode(json.token).capabilities;
    if (cap && cap.find) {
      cap.find((c) => {
        if (c === 'Playbooks') {
          resolve(json);
        } else {
          reject({
            response: {
              status: 403,
              statusText: 'Invalid license'
            }
          });
        }
      });
    } else {
      reject({
        response: {
          status: 403,
          statusText: 'Invalid capabilities'
        }
      });
    }
  });
}
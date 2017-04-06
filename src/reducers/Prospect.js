import {createReducer} from '../utils';
import {GET_PROSPECT_REQUEST, GET_PROSPECT_SUCCESS, GET_PROSPECT_FAILURE, LOGOUT_USER} from '../constants';

const initialState = {
  payload: null,
  statusText: null
};

export default createReducer(initialState, {
  [GET_PROSPECT_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'payload': payload,
      'statusText': null
    });
  },
  [GET_PROSPECT_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'payload': payload,
      'statusText': 'Successfully retrieved prospect.'
    });
  },
  [GET_PROSPECT_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'payload': null,
      'statusText': `${payload.statusText}`
    });
  }
});
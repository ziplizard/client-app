import { checkHttpStatus, parseJSON } from '../utils';
import { GET_PROSPECT_REQUEST, GET_PROSPECT_FAILURE, GET_PROSPECT_SUCCESS } from '../constants';

export function getProspectSuccess(response) {
  return {
    type: GET_PROSPECT_SUCCESS,
    payload: response
  }
}

export function getProspectFailure(error) {
  return {
    type: GET_PROSPECT_FAILURE,
    payload: error
  }
}

export function getProspectRequest(data) {
  return {
    type: GET_PROSPECT_REQUEST,
    payload: data
  }
}

export function getProspect(json) {
  let url = process.env.CRM_API_URL || 'http://localhost:8088';
  url =  url + '/prospects/' + json.Id;
  
  let auth = JSON.parse(localStorage.getItem('auth') || '{}');
  let token = auth.token;
  
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
  .then(checkHttpStatus)
  .then(parseJSON)
  .then(response => {
    return response;
  })
  .catch(e => {
    throw({
      response: {
        status: 400,
        statusText: 'Problem getting prospect'
      }
    });
  });
}

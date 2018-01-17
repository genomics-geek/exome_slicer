import { get as lodashGet, upperCase } from 'lodash'

import api from 'Src/utils/api'


// Actions

export const request = (resource, requestType, prefix) => {
  let type = `${upperCase(resource)}_REQUEST`

  if (prefix) {
    type = `${upperCase(prefix)}_${type}`
  }

  return {
    type,
    loading: true,
    requestType,
  }
}

export const success = (resource, requestType, response, prefix) => {
  let type = `${upperCase(resource)}_SUCCESS`

  if (prefix) {
    type = `${upperCase(prefix)}_${type}`
  }

  return {
    type,
    loading: false,
    requestType,
    response,
  }
}

export const failure = (resource, requestType, error, prefix) => {
  let type = `${upperCase(resource)}_FAILURE`

  if (prefix) {
    type = `${upperCase(prefix)}_${type}`
  }

  return {
    type,
    loading: false,
    requestType,
    error,
  }
}


// Action Creators

export const detail = (resource, resourceId, prefix, apiRoot = 'api') =>
  (dispatch) => {
    dispatch(request(resource, 'DETAIL', prefix))
    api.get(`/${apiRoot}/${resource}/${resourceId}/`)
    .then(response =>
      dispatch(success(resource, 'DETAIL', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource, 'DETAIL', error, prefix))
    )
  }

export const list = (resource, prefix, apiRoot = 'api') =>
  (dispatch) => {
    dispatch(request(resource, 'LIST', prefix))
    api.get(`/${apiRoot}/${prefix}/${resource}/`)
    .then(response =>
      dispatch(success(resource, 'LIST', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource, 'LIST', error, prefix))
    )
  }

export const search = (resource, query, prefix, apiRoot = 'api') =>
  (dispatch) => {
    dispatch(request(resource, 'SEARCH', prefix))
    api.get(`/${apiRoot}/${resource}/${query}`)
    .then(response =>
      dispatch(success(resource, 'SEARCH', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource, 'SEARCH', error, prefix))
    )
  }

export const post = (resource, data, prefix, apiRoot = 'api') =>
  (dispatch) => {
    dispatch(request(resource, 'CREATE', prefix))
    api.post(`/${apiRoot}/${resource}/`, data)
    .then(response =>
      dispatch(success(resource, 'CREATE', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource, 'CREATE', error, prefix))
    )
  }


export const put = (resource, resourceId, data, prefix, apiRoot = 'api') =>
  (dispatch) => {
    dispatch(request(resource, 'UPDATE', prefix))
    api.put(`/${apiRoot}/${resource}/${resourceId}/`, data)
    .then(response =>
      dispatch(success(resource, 'UPDATE', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource, 'UPDATE', error, prefix))
    )
  }


export const patch = (resource, resourceId, data, prefix, apiRoot = 'api') =>
  (dispatch) => {
    dispatch(request(resource, 'PATCH', prefix))
    api.patch(`/${apiRoot}/${resource}/${resourceId}/`, data)
    .then(response =>
      dispatch(success(resource, 'PATCH', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource, 'PATCH', error, prefix))
    )
  }


// Reducer

const initialState = {
  loading: false,
  requestType: undefined,
  status: undefined,
  data: undefined,
  error: undefined,
}


export function createReducer(resource, prefix = undefined) {
  let requestType = `${upperCase(resource)}_REQUEST`
  let successType = `${upperCase(resource)}_SUCCESS`
  let failureType = `${upperCase(resource)}_FAILURE`

  if (prefix) {
    requestType = `${upperCase(prefix)}_${requestType}`
    successType = `${upperCase(prefix)}_${successType}`
    failureType = `${upperCase(prefix)}_${failureType}`
  }

  return (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          loading: action.loading,
          requestType: action.requestType,
        }
      case successType:
        return {
          ...state,
          loading: action.loading,
          requestType: action.requestType,
          status: lodashGet(action.response, 'status', 'N/A'),
          data: lodashGet(action.response, 'data', 'N/A'),
          error: undefined,
        }
      case failureType:
        return {
          ...state,
          loading: action.loading,
          requestType: action.requestType,
          status: lodashGet(action.error, 'response.status', 500),
          data: lodashGet(action.error, 'response.data'),
          error: lodashGet(action.error, 'response.statusText', 'Server Error'),
        }
      default:
        return state
    }
  }
}

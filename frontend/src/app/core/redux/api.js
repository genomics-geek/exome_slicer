import { get as lodashGet } from 'lodash'

import api from 'Src/utils/api'


// Actions

export const request = (resource, requestType, prefix = undefined) => {
  let type = `${resource}_REQUEST`

  if (prefix) {
    type = `${prefix}_${type}`
  }

  return {
    type,
    loading: true,
    requestType,
  }
}

export const success = (resource, requestType, response, prefix = undefined) => {
  let type = `${resource}_SUCCESS`

  if (prefix) {
    type = `${prefix}_${type}`
  }

  return {
    type,
    loading: false,
    requestType,
    response,
  }
}

export const failure = (resource, requestType, error, prefix = undefined) => {
  let type = `${resource}_FAILURE`

  if (prefix) {
    type = `${prefix}_${type}`
  }

  return {
    type,
    loading: false,
    requestType,
    error,
  }
}


// Action Creators

export const detail = (resource, resourceId, prefix, apiRoot = '/api') =>
  (dispatch) => {
    dispatch(request(resource.toUpperCase(), 'DETAIL', prefix))
    api.get(`${apiRoot}/${resource}/${resourceId}/`)
    .then(response =>
      dispatch(success(resource.toUpperCase(), 'DETAIL', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource.toUpperCase(), 'DETAIL', error, prefix))
    )
  }

export const list = (resource, prefix, apiRoot = '/api') =>
  (dispatch) => {
    dispatch(request(resource.toUpperCase(), 'LIST', prefix))
    api.get(`${apiRoot}/${resource}/`)
    .then(response =>
      dispatch(success(resource.toUpperCase(), 'LIST', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource.toUpperCase(), 'LIST', error, prefix))
    )
  }

export const search = (resource, query, prefix, apiRoot = '/api') =>
  (dispatch) => {
    dispatch(request(resource.toUpperCase(), 'SEARCH', prefix))
    api.get(`${apiRoot}/${resource}/${query}`)
    .then(response =>
      dispatch(success(resource.toUpperCase(), 'SEARCH', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource.toUpperCase(), 'SEARCH', error, prefix))
    )
  }

export const post = (resource, data, prefix, apiRoot = '/api') =>
  (dispatch) => {
    dispatch(request(resource.toUpperCase(), 'CREATE', prefix))
    api.post(`${apiRoot}/${resource}/`, data)
    .then(response =>
      dispatch(success(resource.toUpperCase(), 'CREATE', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource.toUpperCase(), 'CREATE', error, prefix))
    )
  }


export const put = (resource, resourceId, data, prefix, apiRoot = '/api') =>
  (dispatch) => {
    dispatch(request(resource.toUpperCase(), 'UPDATE', prefix))
    api.put(`${apiRoot}/${resource}/${resourceId}/`, data)
    .then(response =>
      dispatch(success(resource.toUpperCase(), 'UPDATE', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource.toUpperCase(), 'UPDATE', error, prefix))
    )
  }


export const patch = (resource, resourceId, data, prefix, apiRoot = '/api') =>
  (dispatch) => {
    dispatch(request(resource.toUpperCase(), 'PATCH', prefix))
    api.patch(`${apiRoot}/${resource}/${resourceId}/`, data)
    .then(response =>
      dispatch(success(resource.toUpperCase(), 'PATCH', response, prefix))
    )
    .catch(error =>
      dispatch(failure(resource.toUpperCase(), 'PATCH', error, prefix))
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
  let requestType = `${resource}_REQUEST`
  let successType = `${resource}_SUCCESS`
  let failureType = `${resource}_FAILURE`

  if (prefix) {
    requestType = `${prefix}_${requestType}`
    successType = `${prefix}_${successType}`
    failureType = `${prefix}_${failureType}`
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

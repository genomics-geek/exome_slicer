import { upperCase } from 'lodash'


// Actions

export const updateFilter = (key, value) => ({
  type: `UPDATE_${upperCase(key)}_FILTER`,
  value,
})


// Reducer

export const initialState = {}


export function createReducer(key = '') {
  return (state = initialState, action) => {
    switch (action.type) {
      case `UPDATE_${upperCase(key)}_FILTER`:
        return {
          ...state,
          [key]: action.value,
        }
      default:
        return state
    }
  }
}

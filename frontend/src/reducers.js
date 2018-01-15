import { routerReducer } from 'react-router-redux'
import { persistCombineReducers } from 'redux-persist'
import localForage from 'localforage'

import { createReducer as createFilterReducer } from 'Src/app/core/redux/update-filters'


const reducers = {
  routing: routerReducer,
  gene: createFilterReducer('gene'),
  genes: createFilterReducer('genes'),
  transcript: createFilterReducer('transcript'),
  quality: createFilterReducer('quality'),
  coverage: createFilterReducer('coverage'),
  mode: createFilterReducer('mode'),
}

const persistConfig = {
  key: 'root',
  storage: localForage,
  blacklist: [],
}

const rootReducer = persistCombineReducers(persistConfig, reducers)


export default rootReducer

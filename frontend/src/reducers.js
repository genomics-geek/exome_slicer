import { routerReducer } from 'react-router-redux'
import { persistCombineReducers } from 'redux-persist'
import localForage from 'localforage'

import { createReducer as createAPIReducer } from 'Src/app/core/redux/api'
import { createReducer as createFilterReducer } from 'Src/app/core/redux/update-filters'


const reducers = {
  routing: routerReducer,
  genes: createFilterReducer('genes'),
  transcripts: createFilterReducer('transcripts'),
  quality: createFilterReducer('quality'),
  coverage: createFilterReducer('coverage'),
  mode: createFilterReducer('mode'),
  stats: createAPIReducer('stats'),
  geneOptions: createAPIReducer('genes'),
  transcriptOptions: createAPIReducer('transcripts'),
}

const persistConfig = {
  key: 'root',
  storage: localForage,
  blacklist: [],
}

const rootReducer = persistCombineReducers(persistConfig, reducers)


export default rootReducer

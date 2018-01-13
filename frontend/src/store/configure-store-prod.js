import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import localForage from 'localforage'
import thunk from 'redux-thunk'

import rootReducer from 'Src/reducers'
import history from 'Src/history'


const persistConfig = {
  key: 'persistKey',
  storage: localForage,
  blacklist: [
    'routing',
  ],
}

const reducer = persistCombineReducers(persistConfig, rootReducer)

const enhancer = compose(
  // Middleware you want to use in production
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(history)),
  // redux-persist v5 doesn't need autoRehydrate() anymore
)

// Function to call to configure Redux store
const configureStore = (initialState) => {

  const store = createStore(
    reducer,
    initialState,
    enhancer
  )

  const persistor = persistStore(store)

  return { persistor, store }
}


export default configureStore

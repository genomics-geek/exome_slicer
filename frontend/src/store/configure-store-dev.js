import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { createLogger } from 'redux-logger'
import localForage from 'localforage'
import thunk from 'redux-thunk'

import rootReducer from 'Src/reducers'
import history from 'Src/history'
import DevTools from 'Src/root/dev-tools'


const persistConfig = {
  key: 'root',
  storage: localForage,
  blacklist: [
    'routing',
  ],
}

const reducer = persistCombineReducers(persistConfig, rootReducer)

const enhancer = compose(
  // Middleware you want to use in development
  applyMiddleware(thunk, createLogger()),
  applyMiddleware(routerMiddleware(history)),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)

// Function to call to configure Redux store
const configureStore = (initialState) => {

  const store = createStore(
    reducer,
    initialState,
    enhancer
  )

  const persistor = persistStore(store)

  // Hot Reload reducers
  // Note: Requires Webpack or Browserify HMR to be enabled
  if (module.hot) {
    module.hot.accept('Src/reducers', () => {
      const nextRootReducer = require('Src/reducers.js')
      store.replaceReducer(nextRootReducer)
    })
  }

  return { persistor, store }
}


export default configureStore

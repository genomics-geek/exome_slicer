import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistStore } from 'redux-persist'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from 'Src/reducers'
import history from 'Src/history'
import DevTools from 'Src/root/dev-tools'


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
    rootReducer,
    initialState,
    enhancer
  )

  // Hot Reload reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  const persistor = persistStore(store)

  return { persistor, store }
}


export default configureStore

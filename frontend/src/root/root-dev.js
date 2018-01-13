import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import App from 'Src/app'
import DevTools from './dev-tools'


const Root = ({ store, history, persistor }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <React.Fragment>
          <App />
          <DevTools />
        </React.Fragment>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
)


Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  persistor: PropTypes.object.isRequired
}


export default Root

import React from 'react'

import createHistory from 'history/createBrowserHistory'
import Raven from 'raven-js'
import { Provider as AlertProvider } from 'react-alert'
import { ApolloProvider } from 'react-apollo'
import { Router } from 'react-router-dom'

import AlertTemplate, { alertOptions } from 'common/alert/template'
import client from 'apollo/client'
import Routes from 'routes'


if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.REACT_APP_SENTRY_URL).install()
}

const history = createHistory()


const App = () => (
  <ApolloProvider client={client}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Router history={history}>
        <Routes />
      </Router>
    </AlertProvider>
  </ApolloProvider>
)


export default App

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import registerServiceWorker from 'Src/registerServiceWorker'

import Root from 'Src/root'
import configureStore from 'Src/store'
import history from 'Src/history'
// import 'Stylesheets/main.scss'


const rootEl = document.getElementById('root')
const { persistor, store } = configureStore()

ReactDOM.render(
  <AppContainer>
    <Root store={store} persistor={persistor} history={history} />
  </AppContainer>,
  rootEl
)

registerServiceWorker()

// Hot Reloader: http://joshbroton.com/add-react-hot-reloading-create-react-app/
if (module.hot) {
  module.hot.accept()
}

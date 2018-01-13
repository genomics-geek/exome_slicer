import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from 'Src/app/home'


class Routes extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    )
  }
}


export default Routes

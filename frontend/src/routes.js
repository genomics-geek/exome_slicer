import React from 'react'

import { Route, Switch } from 'react-router-dom'

import NavMenu from 'common/nav-menu'
import Home from 'app/home'


const Routes = () => (
  <React.Fragment>
    <NavMenu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/app/" component={Home} />
    </Switch>
  </React.Fragment>
)


export default Routes

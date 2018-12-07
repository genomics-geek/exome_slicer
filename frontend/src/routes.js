import React from 'react'

import { Route, Switch } from 'react-router-dom'

import NavMenu from 'common/nav-menu'


const Home = () => <p>Home</p>


const Routes = () => (
  <React.Fragment>
    <NavMenu />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </React.Fragment>
)


export default Routes

import React from 'react'

import { Route, Switch } from 'react-router-dom'

import NavMenu from 'common/nav-menu'
import Home from 'app/home'
import BatchAnalyzer from 'app/batch-analyzer'
import GeneAnalyzer from 'app/gene-analyzer'


const Routes = () => (
  <React.Fragment>
    <NavMenu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/app/" component={Home} />
      <Route exact path="/app/batch-analyzer" component={BatchAnalyzer} />
      <Route exact path="/app/gene-analyzer/" component={GeneAnalyzer} />
      <Route path="/app/gene-analyzer/:gene" component={GeneAnalyzer} />
    </Switch>
  </React.Fragment>
)


export default Routes

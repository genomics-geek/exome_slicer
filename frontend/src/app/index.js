import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from 'Src/app/home'
import NavMenu from 'Src/app/core/components/nav-menu'
import BatchAnalyzer from 'Src/app/batch-analyzer'
import GeneAnalyzer from 'Src/app/gene-analyzer'

import 'Stylesheets/main.scss'


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavMenu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/app/gene-analyzer/" component={GeneAnalyzer} />
          <Route exact path="/app/batch-analyzer/" component={BatchAnalyzer} />
        </Switch>
      </React.Fragment>
    )
  }
}


export default App

import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

const NavMenu = React.lazy(() => import('./common/nav-menu'))
const Home = React.lazy(() => import('./app/home'))
const BatchAnalyzer = React.lazy(() => import('./app/batch-analyzer'))
// const GeneAnalyzer = React.lazy(() => import('./app/gene-analyzer'))

const Routes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <NavMenu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/app/" component={Home} />
      <Route exact path="/app/batch-analyzer" component={BatchAnalyzer} />
      {/* <Route exact path="/app/gene-analyzer/" component={GeneAnalyzer} />
      <Route path="/app/gene-analyzer/:gene" component={GeneAnalyzer} /> */}
    </Switch>
  </Suspense>
)

export default Routes

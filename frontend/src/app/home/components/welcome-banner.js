import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import { GenesDropdown } from 'common/drop-downs'


const WelcomeBanner = () => (
  <Grid centered className="banner">

    <Grid.Row>
      <h1 className="banner title">
        Welcome to ExomeSlicer
      </h1>
    </Grid.Row>

    <Grid.Row className="banner detail">
      <p>Designing NGS Virtual Panels</p>
    </Grid.Row>

    <Grid.Row>
      <p className="banner info">
        To get started, search for a gene of interest
        (or click <Link to="/app/batch-analyzer/">here</Link> for a batch request)
      </p>
    </Grid.Row>

    <Grid.Row className="banner action">
      <Grid.Column width={8}>
          <GenesDropdown
            name="genes"
            fluid
            search
            selection
          />
      </Grid.Column>

    </Grid.Row>

  </Grid>
)


export default WelcomeBanner

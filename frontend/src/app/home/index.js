import React from 'react'
import { Grid } from 'semantic-ui-react'

import AboutSection from './about-section'
import RecentNews from './recent-news'
import WelcomeBanner from './welcome-banner'

import './index.scss'

const Home = () => (
  <React.Fragment>
    <WelcomeBanner />

    <Grid padded className="about-section">
      <Grid.Column width={10}>
        <AboutSection />
      </Grid.Column>

      <Grid.Column width={6}>
        <RecentNews />
      </Grid.Column>
    </Grid>
  </React.Fragment>
)

export default Home

import React from 'react'
import { Grid } from 'semantic-ui-react'

import AboutSection from './components/about-section'
import RecentNews from './components/recent-news'
// import WelcomeBanner from './components/welcome-banner'

import './index.scss'


const Home = () => (
  <React.Fragment>

    {/* <WelcomeBanner /> */}

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

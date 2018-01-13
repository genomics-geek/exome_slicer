import React from 'react'
import * as Genomix from 'react-genomix'


const Home = () => (
  <div className="App">
    <br/>
    <header className="App-header">
      <h2 className="App-title">Welcome to ExomeSlicer</h2>
    </header>
    <p className="App-intro">
      To get started, edit <code>frontend/src/App.js</code> and save to reload.
    </p>
    <p className="App-description">
      Stylesheets have been added to <code>frontend/src/</code> folder.
    </p>
    <Genomix.Button content="Cancel" icon="cancel" color="action-error" inverted />
    <Genomix.Button content="button" icon="add"/>
    <Genomix.AcceptButton />
    <br/>
    <br/>
  </div>
)


export default Home

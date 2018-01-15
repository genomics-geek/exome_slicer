import { connect } from 'react-redux'

import Chart from '../components/chart'


const mapStateToProps = state => ({
  mode: state.mode.mode,
  transcript: state.transcript.transcript,
  coverageFilter: state.coverage.coverage,
  qualityFilter: state.quality.quality,
})


export default connect(mapStateToProps)(Chart)

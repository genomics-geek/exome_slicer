import { connect } from 'react-redux'
import { get } from 'lodash'

import Chart from '../components/chart'


const mapStateToProps = state => ({
  stats: state.stats,
  mode: get(state.mode, 'mode'),
  transcripts: get(state.transcripts, 'transcripts'),
  coverage: get(state.coverage, 'coverage'),
  quality: get(state.quality, 'quality'),
})


export default connect(mapStateToProps)(Chart)

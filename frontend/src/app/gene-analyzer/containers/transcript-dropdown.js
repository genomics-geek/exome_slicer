import { connect } from 'react-redux'
import { get } from 'lodash'

import TranscriptDropdown from '../components/transcript-dropdown'
import { updateFilter } from 'Src/app/core/redux/update-filters'


const mapStateToProps = state => ({
  transcripts: get(state.transcripts, 'transcripts'),
  transcriptOptions: state.transcriptOptions,
})

const mapDispatchToProps = dispatch => ({
  updateFilter: value => dispatch(updateFilter('transcripts', value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(TranscriptDropdown)

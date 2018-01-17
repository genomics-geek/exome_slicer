import { connect } from 'react-redux'
import { get } from 'lodash'

import QualityTable from '../components/quality-table'
import { updateFilter } from 'Src/app/core/redux/update-filters'
import { search } from 'Src/app/core/redux/api'


const mapStateToProps = state => ({
  stats: state.stats,
  coverage: get(state.coverage, 'coverage'),
  quality: get(state.quality, 'quality'),
})

const mapDispatchToProps = dispatch => ({
  updateFilter: (key, value) => dispatch(updateFilter(key, value)),
  searchAction: (key, query) => dispatch(search(key, query)),
})


export default connect(mapStateToProps, mapDispatchToProps)(QualityTable)

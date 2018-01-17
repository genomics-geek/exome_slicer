import { connect } from 'react-redux'
import { get } from 'lodash'

import SearchForm from '../components/search-form'
import { updateFilter } from 'Src/app/core/redux/update-filters'
import { search } from 'Src/app/core/redux/api'


const mapStateToProps = state => ({
  genes: get(state.genes, 'genes'),
  coverage: get(state.coverage, 'coverage'),
  quality: get(state.quality, 'quality'),
})

const mapDispatchToProps = dispatch => ({
  updateFilter: (key, value) => dispatch(updateFilter(key, value)),
  searchAction: (resource, query) => dispatch(search(resource, query)),
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)

import { connect } from 'react-redux'

import SearchForm from '../components/search-form'
import { updateFilter } from 'Src/app/core/redux/update-filters'
import { search } from 'Src/app/core/redux/api'


const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  updateFilter: (key, value) => dispatch(updateFilter(key, value)),
  geneSearch: symbols => dispatch(search('genes', `?symbols=${symbols}`)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)

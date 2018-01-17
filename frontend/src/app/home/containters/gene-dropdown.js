import { connect } from 'react-redux'

import GeneDropdown from '../components/gene-dropdown'
import { updateFilter } from 'Src/app/core/redux/update-filters'
import { search } from 'Src/app/core/redux/api'


const mapStateToProps = state => ({
  options: state.geneOptions,
})

const mapDispatchToProps = dispatch => ({
  updateFilter: (key, value) => dispatch(updateFilter(key, value)),
  searchAction: (key, query) => dispatch(search(key, query)),
})


export default connect(mapStateToProps, mapDispatchToProps)(GeneDropdown)

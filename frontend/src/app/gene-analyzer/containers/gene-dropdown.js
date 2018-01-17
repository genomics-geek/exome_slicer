import { connect } from 'react-redux'

import GeneDropdown from '../components/gene-dropdown'
import { updateFilter } from 'Src/app/core/redux/update-filters'
import { search } from 'Src/app/core/redux/api'


const mapStateToProps = state => ({
  geneOptions: state.geneOptions,
})

const mapDispatchToProps = dispatch => ({
  updateFilter: (key, value) => dispatch(updateFilter(key, value)),
  searchAction: query => dispatch(search('genes', query)),
})


export default connect(mapStateToProps, mapDispatchToProps)(GeneDropdown)

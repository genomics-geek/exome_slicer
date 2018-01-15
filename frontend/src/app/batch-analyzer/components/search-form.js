import React from 'react'
import PropTypes from 'prop-types'
import { FormInput, TextArea } from 'semantic-ui-react'
import { Button, SaveFormModal } from 'react-genomix'
import { get, pick } from 'lodash'


class SearchForm extends React.PureComponent {
  onSubmit = data => {
    const { geneSearch, updateFilter } = this.props

    const genes = get(data, 'genes', undefined)
    if (genes) {
      const genesValues = genes.replace('\n', ',').replace(';', ',').replace(/\s+/g, ',')
      const genesArray = genesValues.split(',')
      const genesFilter = genesArray.join(',')
      updateFilter('genes', genesFilter)
      // geneSearch(genesFilter)
    }

    const filters = pick(data, ['coverage', 'quality'])
    Object.keys(filters).forEach((key) => {
      updateFilter(key, filters[key])
    })
  }

  render() {
    return (
      <SaveFormModal
        trigger={<Button icon="filter" color="dark-blue" inverted content="Filter" />}
        formId="batch-search"
        title="Search Filters"
        onSubmit={this.onSubmit}
      >
        <FormInput
          label="Genes"
          name="genes"
          control={TextArea}
        />
        <FormInput
          label="Avg. Mapping Quality"
          name="quality"
          type="number"
        />
        <FormInput
          label="Min. Depth"
          name="coverage"
          type="number"
        />
      </SaveFormModal>
    )
  }
}


SearchForm.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  geneSearch: PropTypes.func.isRequired,
}


SearchForm.defaultProps = {}


export default SearchForm

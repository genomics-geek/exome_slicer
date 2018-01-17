import React from 'react'
import PropTypes from 'prop-types'
import { FormInput, TextArea } from 'semantic-ui-react'
import { Button, SaveFormModal } from 'react-genomix'
import { get } from 'lodash'


class SearchForm extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      genes: props.genes,
      coverage: props.coverage,
      quality: props.quality,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { genes, coverage, quality } = this.props

    if (genes !== nextProps.genes) {
      this.setState({ genes:  nextProps.genes })
    }

    if (coverage !== nextProps.coverage) {
      this.setState({ coverage:  nextProps.coverage })
    }

    if (quality !== nextProps.quality) {
      this.setState({ quality:  nextProps.quality })
    }
  }

  handleChange = (e, { name, value }) => {
    const { updateFilter } = this.props
    if (updateFilter) {
      updateFilter(name, value)
    }
  }

  handleSubmit = data => {
    const { searchAction } = this.props
    const query = ['limit=2500']

    const genes = get(data, 'genes')
    if (genes) {
      const genesValues = genes.replace('\n', ',').replace(';', ',').replace(/\s+/g, ',')
      const genesArray = genesValues.split(',')
      const genesFilter = genesArray.join(',')
      query.push(`genes=${genesFilter}`)
    }

    const coverage = get(data, 'coverage')
    const quality = get(data, 'quality')
    if (coverage && quality) {
      query.push(`quality_filters=${coverage},${quality}`)
    }
    else if (coverage) {
      query.push(`min_coverage=${coverage}`)
    }
    else if (quality) {
      query.push(`avg_mapping_quality=${quality}`)
    }

    if (query.length > 0) {
      searchAction('stats', `?${query.join('&')}`)
    }
  }

  render() {
    const { genes, coverage, quality } = this.state

    return (
      <SaveFormModal
        trigger={<Button icon="filter" color="dark-blue" inverted content="Filter" />}
        formId="batch-search"
        title="Search Filters"
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        defaultValues={this.state}
      >
        <FormInput
          label="Genes"
          name="genes"
          control={TextArea}
          defaultValue={genes}
        />
        <FormInput
          label="Avg. Mapping Quality"
          name="quality"
          type="number"
          defaultValue={quality}
        />
        <FormInput
          label="Min. Depth"
          name="coverage"
          type="number"
          defaultValue={coverage}
        />
      </SaveFormModal>
    )
  }
}


SearchForm.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  searchAction: PropTypes.func.isRequired,
  genes: PropTypes.string,
  coverage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quality: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}


SearchForm.defaultProps = {
  genes: '',
  coverage: 15,
  quality: 20,
}


export default SearchForm

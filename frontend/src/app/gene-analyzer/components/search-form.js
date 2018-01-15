import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Dropdown, FormGroup, FormInput } from 'semantic-ui-react'
import { AutoCompleteDropDown, Button, SaveFormModal } from 'react-genomix'
import { get } from 'lodash'


class SearchForm extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      mode: props.mode,
      loading: props.loading,
      geneOptions: props.geneOptions,
      transcriptOptions: props.transcriptOptions,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading, mode, geneOptions, transcriptOptions } = this.props

    if (loading !== nextProps.loading) {
      this.setState({ loading:  nextProps.loading })
    }

    if (mode !== nextProps.mode) {
      this.setState({ mode:  nextProps.mode })
    }

    if (geneOptions !== nextProps.geneOptions) {
      this.setState({ geneOptions:  nextProps.geneOptions })
    }

    if (transcriptOptions !== nextProps.transcriptOptions) {
      this.setState({ transcriptOptions:  nextProps.transcriptOptions })
    }
  }

  onChange = (e, { name, value }) => {
      this.setState({
        [name]: value
      })
  }

  onSubmit = data => {
    const { geneSearch, transcriptSearch, updateFilter,  } = this.props
    const { mode } = this.state
    updateFilter('mode', mode)

    const gene = get(data, 'gene', undefined)
    if (gene) {
      // geneSearch(gene)
      // transcriptSearch(gene)
    }

    Object.keys(data).forEach((key) => {
      updateFilter(key, data[key])
    })
  }

  render() {
    const { mode, loading, geneOptions, transcriptOptions } = this.state

    return (
      <SaveFormModal
        trigger={<Button icon="filter" color="dark-blue" inverted content="Filter" />}
        formId="gene-search"
        title="Search Filters"
        onSubmit={this.onSubmit}
      >
        <FormInput
          label="Gene"
          name="gene"
          control={AutoCompleteDropDown}
          search
          selection
          endpoint="testAPI?search="
          onChange={(props) => alert(JSON.stringify(props))}
          searchAction={(props) => alert(JSON.stringify(props))}
          options={geneOptions}
          loading={loading}
        />
        <FormInput
          label="Transcript"
          name="transcript"
          control={Dropdown}
          selection
          options={transcriptOptions}
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
        <FormGroup>
          <FormInput
            label="Graph Mapping Quality"
            name="mode"
            control={Checkbox}
            radio
            onChange={this.onChange}
            checked={mode === 'mapping_quality'}
            value="mapping_quality"
          />
          <FormInput
            label="Graph Depth"
            name="mode"
            control={Checkbox}
            radio
            onChange={this.onChange}
            checked={mode === 'depth'}
            value="depth"
          />
        </FormGroup>
      </SaveFormModal>
    )
  }
}


SearchForm.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  geneSearch: PropTypes.func.isRequired,
  transcriptSearch: PropTypes.func.isRequired,
  mode: PropTypes.string,
  loading: PropTypes.bool,
  geneOptions: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
  transcriptOptions: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
}


SearchForm.defaultProps = {
  mode: 'depth',
  loading: false,
  geneOptions: [],
  transcriptOptions: [],
}


export default SearchForm

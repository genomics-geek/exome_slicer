import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, FormGroup, FormInput } from 'semantic-ui-react'
import { Button, SaveFormModal } from 'react-genomix'

import GeneDropdown from '../containers/gene-dropdown'
import TranscriptDropdown from '../containers/transcript-dropdown'


class SearchForm extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      mode: props.mode,
      genes: props.genes,
      transcripts: props.transcripts,
      coverage: props.coverage,
      quality: props.quality,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { mode, genes, transcripts, coverage, quality } = this.props

    if (mode !== nextProps.mode) {
      this.setState({ mode:  nextProps.mode })
    }

    if (genes !== nextProps.genes) {
      this.setState({ genes:  nextProps.genes })
    }

    if (transcripts !== nextProps.transcripts) {
      this.setState({ transcripts:  nextProps.transcripts })
    }

    if (coverage !== nextProps.coverage) {
      this.setState({ coverage:  nextProps.coverage })
    }

    if (quality !== nextProps.quality) {
      this.setState({ quality:  nextProps.quality })
    }
  }

  handleChange = (e, { name, value }) => {
    const { updateFilter, searchAction } = this.props
    if (updateFilter) {
      updateFilter(name, value)
    }

    // NOTE: This is to update transcripts
    if (name === 'genes') {
      searchAction('transcripts', `?genes=${value}`)
    }
  }

  handleSubmit = data => {
    const { genes } = data

    if (genes) {
      const { searchAction } = this.props
      searchAction('stats', `?genes=${genes}&limit=3500`)
    }
  }

  render() {
    const { mode, genes, coverage, quality } = this.state

    return (
      <SaveFormModal
        trigger={<Button icon="filter" color="dark-blue" inverted content="Filter" />}
        formId="gene-search"
        title="Search Filters"
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        defaultValues={this.state}
      >
        <FormInput
          label="Gene"
          name="genes"
          control={GeneDropdown}
          defaultValue={genes}
        />
        <FormInput
          label="Transcript"
          name="transcripts"
          control={TranscriptDropdown}
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
        <FormGroup>
          <FormInput
            label="Graph Mapping Quality"
            name="mode"
            control={Checkbox}
            radio
            onChange={this.handleChange}
            checked={mode === 'mapping_quality'}
            value="mapping_quality"
          />
          <FormInput
            label="Graph Depth"
            name="mode"
            control={Checkbox}
            radio
            onChange={this.handleChange}
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
  searchAction: PropTypes.func.isRequired,
  mode: PropTypes.string,
  genes: PropTypes.string,
  coverage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quality: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}


SearchForm.defaultProps = {
  mode: 'depth',
  coverage: 15,
  quality: 20,
}


export default SearchForm

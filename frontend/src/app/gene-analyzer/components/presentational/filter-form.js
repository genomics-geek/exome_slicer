import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import { GenesDropdown, TranscriptsDropdown } from 'common/drop-downs'


const FilterForm = ({ gene, transcript, quality, coverage, mode, onChange }) => (
  <Form>
    <Form.Dropdown
      label="Graphing Mode"
      name="mode"
      value={mode}
      search
      selection
      options={[
        {key: 'depth', value: 'depth', text: 'Depth'},
        {key: 'quality', value: 'quality', text: 'Mapping Quality'},
      ]}
      onChange={onChange}
    />
    <Form.Input
      label="Gene"
      name="gene"
      control={GenesDropdown}
      value={gene}
      onChange={onChange}
      search
      selection
      clearable
    />
    <Form.Input
      label="Transcript"
      name="transcript"
      control={TranscriptsDropdown}
      value={transcript}
      onChange={onChange}
      gene={gene}
      search
      selection
      clearable
    />
    <Form.Input
      label="Avg. Mapping Quality"
      name="quality"
      type="number"
      value={quality}
      onChange={onChange}
    />
    <Form.Input
      label="Min. Depth"
      name="coverage"
      type="number"
      value={coverage}
      onChange={onChange}
    />
  </Form>
)


FilterForm.propTypes = {
  gene: PropTypes.string,
  transcript: PropTypes.string,
  quality: PropTypes.number,
  coverage: PropTypes.number,
  mode: PropTypes.string,
  onChange: PropTypes.func,
}


export default FilterForm

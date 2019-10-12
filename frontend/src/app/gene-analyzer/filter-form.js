import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import { GenesDropdown, TranscriptsDropdown } from 'common/drop-downs'

const FilterForm = ({ gene, transcript, mappingQuality, depth, mode, onChange }) => (
  <Form>
    <Form.Dropdown
      label="Graphing Mode"
      name="mode"
      value={mode}
      search
      selection
      options={[
        { key: 'depth', value: 'depth', text: 'Depth' },
        { key: 'mappingQuality', value: 'mappingQuality', text: 'Mapping Quality' },
      ]}
      onChange={onChange}
    />
    <Form.Input
      label="Gene"
      name="gene"
      control={GenesDropdown}
      value={gene}
      symbol={gene}
      onChange={(e, data) => {
        // NOTE: This ensures we reset transcript dropdown
        onChange(e, data)
        onChange(e, { ...data, ...{ name: 'transcript', value: '' } })
      }}
      search
      selection
      clearable
    />
    <Form.Input
      label="Transcript"
      name="transcript"
      control={TranscriptsDropdown}
      value={transcript}
      transcript={transcript}
      onChange={onChange}
      gene={gene}
      search
      selection
      clearable
    />
    <Form.Input
      label="Avg. Mapping Quality"
      name="mappingQuality"
      type="number"
      value={mappingQuality}
      onChange={onChange}
    />
    <Form.Input label="Min. Depth" name="depth" type="number" value={depth} onChange={onChange} />
  </Form>
)

FilterForm.propTypes = {
  mode: PropTypes.oneOf(['depth', 'mappingQuality']),
  gene: PropTypes.string,
  transcript: PropTypes.string,
  mappingQuality: PropTypes.number,
  depth: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

export default FilterForm

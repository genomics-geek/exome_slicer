import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const handleGenesInput = (onChange, { name, value }) => {
  const genesValues = value
    .replace('\n', ',')
    .replace(';', ',')
    .replace(/\s+/g, ',')
  const genesArray = genesValues.split(',')
  const genesFilter = genesArray.join(',')
  onChange({}, { name: name, value: genesFilter })
}

const FilterForm = ({ genes, quality, coverage, onChange }) => (
  <Form>
    <Form.TextArea label="Genes" name="genes" value={genes} onChange={(e, data) => handleGenesInput(onChange, data)} />
    <Form.Input label="Avg. Mapping Quality" name="quality" type="number" value={quality} onChange={onChange} />
    <Form.Input label="Min. Depth" name="coverage" type="number" value={coverage} onChange={onChange} />
  </Form>
)

FilterForm.propTypes = {
  genes: PropTypes.string,
  quality: PropTypes.number,
  coverage: PropTypes.number,
  onChange: PropTypes.func,
}

export default FilterForm

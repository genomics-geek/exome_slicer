import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'
import { useFormInput } from 'react-genomix/lib/hooks'
import { get, split } from 'lodash'

import FilterForm from './filter-form'

const FilterModal = ({ filters, setFilter }) => {
  const qualityFilters = split(get(filters, 'qualityFilters', '15,30'), ',')
  const genes = filters.genesIn
  const coverage = parseInt(get(qualityFilters, '[0]', 15), 10)
  const quality = parseInt(get(qualityFilters, '[1]', 30), 10)

  const defaultFilters = { genes, coverage, quality }
  const [visible, setVisible] = useState(false)
  const [values, setValues, resetFilters] = useFormInput(defaultFilters)

  return (
    <Modal
      open={visible}
      trigger={<Button content="Filter" icon="filter" color="vk" onClick={() => setVisible(!visible)} />}
    >
      <Modal.Header content="Batch Filters" />
      <Modal.Content>
        <FilterForm
          genes={values.genes}
          coverage={values.coverage}
          quality={values.quality}
          onChange={(e, data) => setValues(data)}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button
          basic
          negative
          icon="x"
          content="Cancel"
          onClick={() => {
            setVisible(false)
            resetFilters(defaultFilters)
          }}
        />
        <Button
          basic
          positive
          icon="check"
          content="Save"
          onClick={() => {
            setVisible(false)
            resetFilters(defaultFilters)
            setFilter({
              genesIn: values.genes,
              qualityFilters: `${values.coverage},${values.quality}`,
            })
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}

FilterModal.propTypes = {
  setFilter: PropTypes.func,
  filters: PropTypes.shape({
    genesIn: PropTypes.string,
    qualityFilters: PropTypes.string,
  }),
}

export default FilterModal

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'

import FilterForm from './filter-form'

const FilterModal = ({ filters, onChange, onSubmit }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Modal
      open={visible}
      trigger={<Button content="Filter" icon="filter" color="vk" onClick={() => setVisible(!visible)} />}
    >
      <Modal.Header content="Batch Filters" />
      <Modal.Content>
        <FilterForm {...filters} onChange={onChange} />
      </Modal.Content>

      <Modal.Actions>
        <Button basic negative icon="x" content="Cancel" onClick={() => setVisible(false)} />
        <Button
          basic
          positive
          icon="check"
          content="Save"
          onClick={() => {
            setVisible(false)
            onSubmit()
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

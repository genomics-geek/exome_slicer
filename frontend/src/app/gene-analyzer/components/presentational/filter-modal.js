import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'

import FilterForm from './filter-form'


const FilterModal = ({ filters, setFilter, onChange }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Modal
      open={visible}
      trigger={
        <Button
          content="Filter"
          icon="filter"
          color="vk"
          onClick={() => setVisible(!visible)}
        />
      }
    >

      <Modal.Header content="Batch Filters" />
      <Modal.Content>
        <FilterForm
          gene={filters.gene}
          transcript={filters.transcript}
          coverage={filters.coverage}
          quality={filters.quality}
          mode={filters.mode}
          onChange={onChange}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button
          basic
					negative
					icon="x"
					content="Cancel"
					onClick={() => setVisible(false)}
				/>
				<Button
					basic
					positive
					icon="check"
					content="Save"
					onClick={() => {
						setVisible(false)
            setFilter({
              "gene": filters.gene,
              "transcript": filters.transcript,
            })
					}}
				/>
			</Modal.Actions>
    </Modal>
  )
}


FilterModal.propTypes = {
  onChange: PropTypes.func,
  setFilter: PropTypes.func,
  filters: PropTypes.shape({
    gene: PropTypes.string,
    transcript: PropTypes.string,
    qualityFilters: PropTypes.string,
  })
}


export default FilterModal

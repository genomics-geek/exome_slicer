import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import { map } from 'lodash'
import update from 'immutability-helper'

const AutocompleteDropdown = ({ refetch, searchVariable, initialVariables = [], ...props }) => {
  const countRef = useRef(null)
  countRef.current = null

  const handleSearchChange = (e, { searchQuery }) => {
    clearTimeout(countRef.current)
    if (refetch) {
      const variables = { [searchVariable]: searchQuery }
      let newVariables = { ...variables }
      map(initialVariables, variable => (newVariables = update(newVariables, { [variable]: { $set: null } })))
      countRef.current = setTimeout(() => refetch(newVariables), 500)
    }
  }

  return <Dropdown search selection onSearchChange={handleSearchChange} {...props} />
}

// NOTE: initialVariables is used to initially load options, but is wiped out on subsequent searches
AutocompleteDropdown.propTypes = {
  refetch: PropTypes.func,
  searchVariable: PropTypes.string.isRequired,
  initialVariables: PropTypes.arrayOf(PropTypes.string),
}

export default AutocompleteDropdown

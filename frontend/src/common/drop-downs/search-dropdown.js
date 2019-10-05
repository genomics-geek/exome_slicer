import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

import AutoCompleteDropdown from './autocomplete-dropdown'

const SearchDropdown = ({ query, variables, staticContext, reformatOptions, ...rest }) => {
  const { data, error, loading, refetch } = useQuery(query, { variables })
  const options = reformatOptions(data)
  return (
    <AutoCompleteDropdown
      error={error !== undefined}
      loading={loading}
      refetch={refetch}
      search // NOTE: We always want this dropdown to be searchable
      options={options}
      {...rest}
    />
  )
}

SearchDropdown.propTypes = {
  query: PropTypes.object.isRequired,
  variables: PropTypes.shape({}).isRequired,
  searchVariable: PropTypes.string.isRequired,
  reformatOptions: PropTypes.func.isRequired,
}

export default SearchDropdown

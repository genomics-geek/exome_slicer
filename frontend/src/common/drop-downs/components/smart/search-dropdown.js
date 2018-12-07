import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { AutoCompleteDropdown } from 'common/drop-downs'


const SearchDropdown = ({ query, variables, searchVariable, reformatOptions, ...rest }) => (
  <Query query={query} variables={variables}>
    {({ data, error, loading, refetch }) => (
      <AutoCompleteDropdown
        options={reformatOptions(data)}
        error={error !== undefined}
        loading={loading}
        refetch={refetch}
        searchVariable={searchVariable}
        {...rest}
      />
    )}
  </Query>
)


SearchDropdown.propTypes = {
  query: PropTypes.object.isRequired,
  variables: PropTypes.shape({}).isRequired,
  searchVariable: PropTypes.string.isRequired,
  reformatOptions: PropTypes.func.isRequired,
}


export default SearchDropdown

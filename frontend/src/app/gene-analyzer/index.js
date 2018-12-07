import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { get, map } from 'lodash'

import Alert from 'common/alert'
import { DimmerLoading } from 'common/loaders'

import GeneAnalyzer from './components/presentational/gene-analyzer'

import { QUERY } from './queries/gene-query'


const View = ({ match }) => {
  const gene = get(match, 'params.gene', 'MFN2')
  const defaultFilters = {gene, transcript:""}
  const [filters, setFilter] = useState(defaultFilters)

  return (
    <Query
      query={QUERY}
      variables={filters}
      fetchPolicy="cache-first"
    >
      {({ loading, error, data }) => {
        if (error) return <Alert type="error" message={`Batch Query: ${error.message}`} />
        if (loading) return <DimmerLoading fullpage message="Retrieving data..." />

        const rows = map(get(data, 'allQualityStats.edges', []), row => get(row, 'node'))

        return (
          <GeneAnalyzer
            rows={rows}
            setFilter={setFilter}
            filters={filters}
          />
        )
      }}
    </Query>
  )
}


View.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      gene: PropTypes.string,
    })
  })
}


export default withRouter(View)

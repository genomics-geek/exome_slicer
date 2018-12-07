import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { get, map } from 'lodash'

import Alert from 'common/alert'
import { DimmerLoading } from 'common/loaders'

import BatchAnalyzer from './components/presentational/batch-analyzer'

import { QUERY } from './queries/batch-query'


const View = () => {
  const defaultFilters = {genesIn: "MFN2,MFN1", qualityFilters: "15,30"}
  const [filters, setFilter] = useState(defaultFilters)

  return (
    <Query
      query={QUERY}
      variables={filters}
    >
      {({ loading, error, data }) => {
        if (error) return <Alert type="error" message={`Batch Query: ${error.message}`} />
        if (loading) return <DimmerLoading fullpage message="Retrieving data..." />

        const rows = map(get(data, 'allQualityStats.edges', []), row => get(row, 'node'))

        return (
          <BatchAnalyzer
            rows={rows}
            setFilter={setFilter}
            filters={filters}
          />
        )
      }}
    </Query>
  )
}


export default View

import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useWindowSize } from 'react-genomix/lib/hooks'
import { Grid } from 'semantic-ui-react'

import Alert from 'common/alert'
import { DownloadButton } from 'common/buttons'
import { DimmerLoading } from 'common/loaders'
import { DataTable } from 'common/tables'

import FilterModal from './filter-modal'
import InfoModal from './info-modal'

import { QUERY } from './queries'
import { parseQuery } from './parsers'

const View = () => {
  const defaultFilters = { genesIn: 'MFN2,MFN1', qualityFilters: '15,30' }
  const [filters, setFilter] = useState(defaultFilters)
  const { innerHeight } = useWindowSize()
  const { data, error, loading } = useQuery(QUERY, { variables: filters, fetchPolicy: 'cache-first' })

  if (error) return <Alert type="error" message={`Batch Query: ${error.message}`} />
  if (loading) return <DimmerLoading fullpage message="Retrieving data..." />
  const rows = parseQuery(data)

  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column width={16}>
          <DownloadButton color="twitter" data={rows} filename="batch-download.csv" />
          <FilterModal filters={filters} setFilter={setFilter} />
          <InfoModal />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={16}>
          <DataTable rows={rows} maxHeight={innerHeight - 200} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default View

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { useFormInput, useWindowSize } from 'react-genomix/lib/hooks'
import { Grid } from 'semantic-ui-react'
import { stringify } from 'query-string'

import Alert from 'common/alert'
import { DimmerLoading } from 'common/loaders'
import { useQueryParams } from 'common/hooks'
import { DownloadButton } from 'common/buttons'
import { DataTable } from 'common/tables'

import { QUERY } from './queries'
import { parseQuery } from './parsers'

import FilterModal from './filter-modal'
import InfoModal from './info-modal'

const View = () => {
  const { innerHeight } = useWindowSize()
  const history = useHistory()
  const variables = useQueryParams()
  const { genes } = variables
  const [filters, setFilter] = useFormInput(variables)
  console.log(variables)

  const { data, error, loading } = useQuery(QUERY, {
    variables: { ...variables, qualityFilters: `${variables.depth},${variables.mappingQuality}` },
    fetchPolicy: 'cache-first',
    skip: !genes,
  })

  if (error) return <Alert type="error" message={`Batch Query: ${error.message}`} />
  if (loading) return <DimmerLoading fullpage message="Retrieving data..." />
  const rows = parseQuery(data)

  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column width={16}>
          <DownloadButton color="twitter" data={rows} filename="batch-download.csv" />
          <FilterModal
            filters={filters}
            onChange={(e, data) => setFilter(data)}
            onSubmit={() => history.push({ pathname: '', search: stringify(filters) })}
          />
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

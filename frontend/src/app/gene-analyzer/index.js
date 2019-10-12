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
import Chart from './chart'

const View = () => {
  const { innerHeight } = useWindowSize()
  const history = useHistory()
  const variables = useQueryParams()
  const { gene, mappingQuality, depth, mode } = variables
  const [filters, setFilter] = useFormInput(variables)

  const { data, error, loading } = useQuery(QUERY, {
    variables,
    fetchPolicy: "cache-first",
    skip: !gene,
  })

  if (error) return <Alert type="error" message={`Gene Query: ${error.message}`} />
  if (loading) return <DimmerLoading fullpage message="Retrieving data..." />
  const { rows, depthDataSet, mappingQualityDataSet } = parseQuery(data)

  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column width={16}>
          <DownloadButton color="twitter" data={rows} filename="gene-download.csv" />
          <FilterModal
            filters={filters}
            onChange={(e, data) => setFilter(data)}
            onSubmit={() => history.push({pathname: '', search: stringify(filters)})}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={16}>
          <div style={{ height: 300 }}>
            {mode === 'depth' && <Chart yLegend="DP" data={depthDataSet} threshold={depth} />}
            {mode === 'mappingQuality' && (
              <Chart yLegend="MQ" data={mappingQualityDataSet} threshold={mappingQuality} />
            )}
          </div>
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

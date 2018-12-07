import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { get, split } from 'lodash'

import { DownloadButton } from 'common/buttons'
import { useFormInput } from 'common/hooks'
import { FixedDataTable } from 'common/tables'

import FilterModal from './filter-modal'
import Chart from './chart'


const GeneAnalyzer = ({ rows, setFilter, filters }) => {
  const qualityFilters = split(get(filters, 'qualityFilters', "15,30"), ',')
  const gene = filters.gene
  const transcript = filters.transcript
  const coverage = parseInt(get(qualityFilters, '[0]', 15), 10)
  const quality = parseInt(get(qualityFilters, '[1]', 30), 10)

  const defaultFilters = {gene, transcript, coverage, quality, mode: 'depth'}
  const [values, setValues] = useFormInput(defaultFilters)

  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column width={16}>
          <DownloadButton color="twitter" data={rows} filename="gene-download.csv" />
          <FilterModal
            filters={values}
            setFilter={setFilter}
            onChange={(e, data) => setValues(data)}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={16}>
          <Chart
            rows={rows}
            transcript={transcript}
            coverageCutoff={values.coverage}
            qualityCutoff={values.quality}
            mode={values.mode}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={16}>
          <FixedDataTable
            rows={rows}
            coverageCutoff={values.coverage}
            qualityCutoff={values.quality}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}


GeneAnalyzer.propTypes = {
  rows: PropTypes.array,
  setFilter: PropTypes.func,
  filters: PropTypes.object,
}


GeneAnalyzer.defaultProps = {
  rows: []
}


export default GeneAnalyzer

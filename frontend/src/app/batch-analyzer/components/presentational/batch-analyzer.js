import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { DownloadButton } from 'common/buttons'
import { FixedDataTable } from 'common/tables'
import FilterModal from './filter-modal'


const BatchAnalyzer = ({ rows, setFilter, filters }) => (
  <Grid padded>
    <Grid.Row>
      <Grid.Column width={16}>
        <DownloadButton color="twitter" data={rows} filename="batch-download.csv" />
        <FilterModal filters={filters} setFilter={setFilter} />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={16}>
        <FixedDataTable rows={rows} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)


BatchAnalyzer.propTypes = {
  rows: PropTypes.array,
  setFilter: PropTypes.func,
  filters: PropTypes.object,
}


BatchAnalyzer.defaultProps = {
  rows: []
}


export default BatchAnalyzer

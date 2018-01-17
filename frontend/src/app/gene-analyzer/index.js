import React from 'react'
import { Grid } from 'semantic-ui-react'

import SearchForm from './containers/search-form'
import Chart from './containers/chart'
import QualityTable from 'Src/app/core/containers/quality-table'


class GeneAnalyzer extends React.PureComponent {
  render() {
    return (
      <Grid padded>

        <Grid.Row>
          <Grid.Column width={16}>
            <Chart />
          </Grid.Column>
        </Grid.Row>

        <QualityTable
          maxHeight={325}
          headerHeight={50}
          rowHeight={35}
          searchForm={<SearchForm />}
        />

      </Grid>
    )
  }
}


export default GeneAnalyzer

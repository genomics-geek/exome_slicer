import React from 'react'
import { Grid } from 'semantic-ui-react'

import QualityTable from 'Src/app/core/containers/quality-table'
import SearchForm from './containers/search-form'


class BatchAnalyzer extends React.PureComponent {
  render() {
    return (
      <Grid padded>
        <QualityTable
          maxHeight={950}
          headerHeight={50}
          rowHeight={35}
          searchForm={<SearchForm />}
        />
      </Grid>
    )
  }
}


export default BatchAnalyzer

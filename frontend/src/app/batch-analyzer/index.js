import React from 'react'
import { Grid } from 'semantic-ui-react'

import QualityTable from 'Src/app/core/components/quality-table'
import SearchForm from './containers/search-form'


const data = Array.from(new Array(30), (x,i) => ({
  id: i + 1,
  locus: 'chr1:69075-70023',
  gene: 'OR4F5',
  transcript: 'NM_001005484',
  cds_exon: i + 1,
  number_of_baits: 2,
  bases_covered_by_baits: 119,
  number_of_bases_in_region: 948,
  pct_bases_covered_by_baits: 0.126,
  avg_mapping_quality: 24.97,
  min_mapping_quality: 8.39,
  max_mapping_quality: 57.56,
  avg_coverage: 13.32,
  min_coverage: 5.0,
  max_coverage: 71.93,
}))


class BatchAnalyzer extends React.PureComponent {
  render() {
    return (
      <Grid padded>
        <QualityTable
          data={data}
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

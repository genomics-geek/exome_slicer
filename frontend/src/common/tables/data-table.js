import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-genomix'
import { Column } from 'react-base-table'

const props = {
  width: 300,
  resizable: true,
  align: 'center',
}

const DataTable = ({ rows = [], loading = false, maxHeight = 500 }) => (
  <Table data={rows} responsive fixed={false} loading={loading} maxHeight={maxHeight} style={{ fontSize: '0.85rem' }}>
    <Column key="gene" dataKey="gene" headerRenderer={() => 'Gene'} {...props} />
    <Column key="transcript" dataKey="transcript" headerRenderer={() => 'Transcript'} {...props} />
    <Column key="cdsExon" dataKey="cdsExon" headerRenderer={() => 'CDS Exon'} {...props} />
    <Column key="numberOfBaits" dataKey="numberOfBaits" headerRenderer={() => '# of Batis'} {...props} />
    <Column
      key="pctBasesCoveredByBaits"
      dataKey="pctBasesCoveredByBaits"
      headerRenderer={() => 'Portion of Bases covered by Baits'}
      {...props}
    />
    <Column
      key="avgMappingQuality"
      dataKey="avgMappingQuality"
      headerRenderer={() => 'Avg. Mapping Quality'}
      {...props}
    />
    <Column key="minCoverage" dataKey="minCoverage" headerRenderer={() => 'Min. Coverage'} {...props} />
  </Table>
)

DataTable.propTypes = {
  coverageCutoff: PropTypes.number,
  qualityCutoff: PropTypes.number,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      gene: PropTypes.string,
      transcript: PropTypes.string,
      cdsExon: PropTypes.number,
      numberOfBaits: PropTypes.number,
      pctBasesCoveredByBaits: PropTypes.number,
      avgMappingQuality: PropTypes.number,
      minCoverage: PropTypes.number,
    })
  ),
}

export default DataTable

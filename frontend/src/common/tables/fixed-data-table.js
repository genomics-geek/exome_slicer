import React from 'react'
import PropTypes from 'prop-types'
import { Cell, Column } from 'fixed-data-table-2'
import { FixedDataTable, TextFixedCell } from 'react-genomix'
import { get } from 'lodash'

import './fixed-data-table.scss'


const getRowClassName = (index, rows, coverageCutoff, qualityCutoff) => {
  if (rows.length > 0) {
    const depth = get(rows[index], 'minCoverage', 0)
    const mappingQuality = get(rows[index], 'avgMappingQuality', 0)

    if (depth <= coverageCutoff && mappingQuality <= qualityCutoff) {
      return 'error'
    } else if (depth <= coverageCutoff || mappingQuality <= qualityCutoff) {
      return 'warning'
    }
  }
}


const columnWidths = {
  id: 75,
  gene: 75,
  transcript: 75,
  cdsExon: 75,
  numberOfBaits: 75,
  pctBasesCoveredByBaits: 75,
  avgMappingQuality: 75,
  minCoverage: 75,
}

const columnOrder = [
  'id',
  'gene',
  'transcript',
  'cdsExon',
  'numberOfBaits',
  'pctBasesCoveredByBaits',
  'avgMappingQuality',
  'minCoverage',
]


const Table = ({ rows, coverageCutoff, qualityCutoff }) => (
  <FixedDataTable
    rowsCount={rows.length}
    maxHeight={850}
    headerHeight={45}
    rowHeight={40}
    columnOrder={columnOrder}
    columnWidths={columnWidths}
    rowClassNameGetter={index => getRowClassName(index, rows, coverageCutoff, qualityCutoff)}
    showScrollbarY={true}
  >
    <Column
      columnKey="gene"
      header={<Cell>Gene</Cell>}
      cell={<TextFixedCell data={rows} />}
      allowCellsRecycling
      pureRendering
      flexGrow={1}
      width={20}
    />
    <Column
      columnKey="transcript"
      header={<Cell>Transcript</Cell>}
      cell={<TextFixedCell data={rows} />}
      allowCellsRecycling
      pureRendering
      flexGrow={1}
      width={20}
    />
    <Column
      columnKey="cdsExon"
      header={<Cell>CDS Exon</Cell>}
      cell={<TextFixedCell data={rows} />}
      allowCellsRecycling
      pureRendering
      flexGrow={1}
      width={20}
    />
    <Column
      columnKey="numberOfBaits"
      header={<Cell># of Baits</Cell>}
      cell={<TextFixedCell data={rows} />}
      allowCellsRecycling
      pureRendering
      flexGrow={1}
      width={20}
    />
    <Column
      columnKey="pctBasesCoveredByBaits"
      header={<Cell>% of Bases covered by Baits</Cell>}
      cell={<TextFixedCell data={rows} />}
      allowCellsRecycling
      pureRendering
      flexGrow={1}
      width={20}
    />
    <Column
      columnKey="avgMappingQuality"
      header={<Cell>Avg. Mapping Quality</Cell>}
      cell={<TextFixedCell data={rows} />}
      allowCellsRecycling
      pureRendering
      flexGrow={1}
      width={20}
    />
    <Column
      columnKey="minCoverage"
      header={<Cell>Min. Coverage</Cell>}
      cell={<TextFixedCell data={rows} />}
      allowCellsRecycling
      pureRendering
      flexGrow={1}
      width={20}
    />
  </FixedDataTable>
)


Table.propTypes = {
  coverageCutoff: PropTypes.number,
  qualityCutoff: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    gene: PropTypes.string,
    transcript: PropTypes.string,
    cdsExon: PropTypes.number,
    numberOfBaits: PropTypes.number,
    pctBasesCoveredByBaits: PropTypes.number,
    avgMappingQuality: PropTypes.number,
    minCoverage: PropTypes.number,
  })),
}


Table.defaultProps = {
  coverageCutoff: 15,
  qualityCutoff: 30,
  rows: [],
}


export default Table

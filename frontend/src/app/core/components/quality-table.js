import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { Cell, Column } from 'fixed-data-table-2'
import { Button, ExportButton, FixedDataTable, GeneFixedCell, TextFixedCell } from 'react-genomix'
import { get } from 'lodash'


const columnWidths = {
  gene: 190,
  locus: 200,
  transcript: 150,
  cds_exon: 90,
  number_of_baits: 120,
  pct_bases_covered_by_baits: 145,
  avg_mapping_quality: 180,
  min_coverage: 120,
}

const columnOrder = [
  'gene',
  'locus',
  'transcript',
  'cds_exon',
  'number_of_baits',
  'pct_bases_covered_by_baits',
  'avg_mapping_quality',
  'min_coverage',
]


class QualityTable extends React.PureComponent {
  constructor(props) {
    super(props)

    const rows = get(props.stats, 'data.results', [])
    const loading = get(props.stats, 'loading', false)

    this.state = {
      rows,
      loading,
      coverage: parseInt(props.coverage, 10),
      quality: parseInt(props.quality, 10),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { stats, coverage, quality } = this.props

    if (stats !== nextProps.stats) {
      const rows = get(nextProps.stats, 'data.results', [])
      const loading = get(nextProps.stats, 'loading', false)
      this.setState({ rows,  loading })
    }

    if (coverage !== nextProps.coverage) {
      this.setState({ coverage:  parseInt(nextProps.coverage, 10) })
    }

    if (quality !== nextProps.quality) {
      this.setState({ quality:  parseInt(nextProps.quality, 10) })
    }
  }

  getRowClassName = (index) => {
    const { coverage, quality, rows } = this.state
    const depth = rows[index].min_coverage
    const mappingQuality = rows[index].avg_mapping_quality

    if (depth <= coverage && mappingQuality <= quality) {
      return 'error'
    } else if (depth <= coverage || mappingQuality <= quality) {
      return 'warning'
    }
  }

  render() {
    const { maxHeight, headerHeight, rowHeight, searchForm } = this.props
    const { loading, rows } = this.state

    return (
      <React.Fragment>

        <Grid.Row>
          <Grid.Column>
            {searchForm}
            <ExportButton
              data={rows}
              filenamePrefix="exome-slicer"
              content={<Button inverted icon="download" content="Download"/>}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column columns={16}>
            <FixedDataTable
              maxHeight={maxHeight}
              dataCount={rows.length}
              headerHeight={headerHeight}
              rowHeight={rowHeight}
              columnWidths={columnWidths}
              columnOrder={columnOrder}
              fixedColumns={['gene', 'locus', 'transcript', 'cds_exon']}
              rowClassNameGetter={this.getRowClassName}
              loading={loading}
              data={rows}
            >
              <Column
                columnKey="gene"
                header={<Cell>Gene</Cell>}
                cell={<GeneFixedCell data={rows} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="locus"
                header={<Cell>Locus</Cell>}
                cell={<TextFixedCell data={rows} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="transcript"
                header={<Cell>Transcript</Cell>}
                cell={<TextFixedCell data={rows} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="cds_exon"
                header={<Cell>CDS Exon</Cell>}
                cell={<TextFixedCell data={rows} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="number_of_baits"
                header={<Cell># of Baits</Cell>}
                cell={<TextFixedCell data={rows} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="pct_bases_covered_by_baits"
                header={<Cell>% of Bases Baited</Cell>}
                cell={<TextFixedCell data={rows} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="avg_mapping_quality"
                header={<Cell>Avg. Mapping Quality</Cell>}
                cell={<TextFixedCell data={rows} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="min_coverage"
                header={<Cell>Min. Depth</Cell>}
                cell={<TextFixedCell data={rows} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
            </FixedDataTable>
          </Grid.Column>
        </Grid.Row>

      </React.Fragment>
    )
  }
}


QualityTable.propTypes = {
  stats: PropTypes.shape({
    loading: PropTypes.bool,
    requestType: PropTypes.string,
    status: PropTypes.number,
    data: PropTypes.shape({
      count: PropTypes.number,
      next: PropTypes.string,
      previous: PropTypes.string,
      results: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        locus: PropTypes.string,
        gene: PropTypes.string,
        transcript: PropTypes.string,
        cds_exon: PropTypes.number,
        number_of_baits: PropTypes.number,
        bases_covered_by_baits: PropTypes.number,
        number_of_bases_in_region: PropTypes.number,
        pct_bases_covered_by_baits: PropTypes.number,
        avg_mapping_quality: PropTypes.number,
        min_mapping_quality: PropTypes.number,
        max_mapping_quality: PropTypes.number,
        avg_coverage: PropTypes.number,
        min_coverage: PropTypes.number,
        max_coverage: PropTypes.number,
      }))
    }),
    error: PropTypes.string,
  }),
  coverage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quality: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}


QualityTable.defaultProps = {
  stats: {
    loading: false
  },
  coverage: 15,
  quality: 20,
}


export default QualityTable

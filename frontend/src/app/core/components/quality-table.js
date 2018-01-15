import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { Cell, Column } from 'fixed-data-table-2'
import { Button, ExportButton, FixedDataTable, GeneFixedCell, TextFixedCell } from 'react-genomix'


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

    this.state = {
      data: props.data,
      loading: props.loading,
      coverageFilter: parseInt(props.coverageFilter, 10),
      qualityFilter: parseInt(props.qualityFilter, 10),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data, loading, coverageFilter, qualityFilter } = this.props

    if (data !== nextProps.data) {
      this.setState({ data:  nextProps.data })
    }

    if (loading !== nextProps.loading) {
      this.setState({ loading:  nextProps.loading })
    }

    if (coverageFilter !== nextProps.coverageFilter) {
      this.setState({ coverageFilter:  parseInt(nextProps.coverageFilter, 10) })
    }

    if (qualityFilter !== nextProps.qualityFilter) {
      this.setState({ qualityFilter:  parseInt(nextProps.qualityFilter, 10) })
    }
  }

  getRowClassName = (index) => {
    const { coverageFilter, qualityFilter, data } = this.state
    const depth = data[index].min_depth
    const quality = data[index].avg_mapping_quality

    if (depth <= coverageFilter && quality <= qualityFilter) {
      return 'error'
    } else if (depth <= coverageFilter || quality <= qualityFilter) {
      return 'warning'
    }
  }

  render() {
    const { maxHeight, headerHeight, rowHeight, searchForm } = this.props
    const { loading, data } = this.state

    return (
      <React.Fragment>

        <Grid.Row>
          <Grid.Column>
            {searchForm}
            <ExportButton
              data={data}
              filenamePrefix="exome-slicer"
              content={<Button inverted icon="download" content="Download"/>}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column columns={16}>
            <FixedDataTable
              maxHeight={maxHeight}
              dataCount={data.length}
              headerHeight={headerHeight}
              rowHeight={rowHeight}
              columnWidths={columnWidths}
              columnOrder={columnOrder}
              fixedColumns={['gene', 'locus', 'transcript', 'cds_exon']}
              rowClassNameGetter={this.getRowClassName}
              loading={loading}
              data={data}
            >
              <Column
                columnKey="gene"
                header={<Cell>Gene</Cell>}
                cell={<GeneFixedCell data={data} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="locus"
                header={<Cell>Locus</Cell>}
                cell={<TextFixedCell data={data} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="transcript"
                header={<Cell>Transcript</Cell>}
                cell={<TextFixedCell data={data} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="cds_exon"
                header={<Cell>CDS Exon</Cell>}
                cell={<TextFixedCell data={data} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="number_of_baits"
                header={<Cell># of Baits</Cell>}
                cell={<TextFixedCell data={data} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="pct_bases_covered_by_baits"
                header={<Cell>% of Bases Baited</Cell>}
                cell={<TextFixedCell data={data} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="avg_mapping_quality"
                header={<Cell>Avg. Mapping Quality</Cell>}
                cell={<TextFixedCell data={data} />}
                allowCellsRecycling
                pureRendering
                isReorderable
                flexGrow={1}
                width={20}
              />
              <Column
                columnKey="min_coverage"
                header={<Cell>Min. Depth</Cell>}
                cell={<TextFixedCell data={data} />}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  loading: PropTypes.bool,
  coverageFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  qualityFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}


QualityTable.defaultProps = {
  data: [],
  loading: false,
  coverageFilter: 15,
  qualityFilter: 20,
}


export default QualityTable

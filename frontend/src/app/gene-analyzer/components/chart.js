import React from 'react'
import PropTypes from 'prop-types'
import { Dimmer, Loader } from 'semantic-ui-react'
import {
  Candle,
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryTheme,
  VictoryTooltip,
} from 'victory'
import { get, has, map, merge } from 'lodash'


class Chart extends React.PureComponent {
  static prepareData(props, state) {
    const { passColor, warningColor, errorColor } = props
    const { rows, coverage, quality } = state
    const data = {}

    map(rows, element => {

      const depth = get(element, 'min_coverage')
      const mappingQuality = get(element, 'avg_mapping_quality')
      const newData = {}
      if (depth <= coverage && mappingQuality <= quality) {
        newData.fill = errorColor
        newData.stroke = errorColor
      } else if (depth <= coverage || mappingQuality <= quality) {
        newData.fill = warningColor
        newData.stroke = warningColor
      } else {
        newData.fill = passColor
        newData.stroke = passColor
      }

      const coloredData = merge(element, newData)

      if (has(data, element.transcript)) {
        data[element.transcript].push(coloredData)
      } else {
        data[element.transcript] = [coloredData]
      }
    })

    return data
  }

  constructor(props) {
    super(props)

    const rows = get(props.stats, 'data.results', [])
    const loading = get(props.stats, 'loading', false)
    const coverage = parseInt(props.coverage, 10)
    const quality = parseInt(props.quality, 10)

    this.state = {
      rows,
      loading,
      mode: props.mode,
      transcripts: props.transcripts,
      coverage,
      quality,
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      stats,
      mode,
      transcripts,
      coverage,
      quality,
    } = this.props

    if (stats !== nextProps.stats) {
      const rows = get(nextProps.stats, 'data.results', [])
      const loading = get(nextProps.stats, 'loading', false)
      this.setState({ rows, loading })
    }

    if (mode !== nextProps.mode) {
      this.setState({ mode:  nextProps.mode })
    }

    if (transcripts !== nextProps.transcripts) {
      this.setState({ transcripts:  nextProps.transcripts })
    }

    if (coverage !== nextProps.coverage) {
      this.setState({ coverage:  parseInt(nextProps.coverage, 10) })
    }

    if (quality !== nextProps.quality) {
      this.setState({ quality:  parseInt(nextProps.quality, 10) })
    }
  }

  tooltipText = datum => {
    return `cds exon: ${datum.cds_exon}
      min coverage: ${datum.min_coverage}
      avg coverage: ${datum.avg_coverage}
      max coverage: ${datum.max_coverage}
      min mapping quality: ${datum.min_mapping_quality}
      avg mapping quality: ${datum.avg_mapping_quality}
      max mapping quality: ${datum.max_mapping_quality}`
  }

  render() {
    const { passColor, warningColor, errorColor } = this.props
    const { rows, mode, transcripts, loading } = this.state
    const data = Chart.prepareData(this.props, this.state)

    let transcript = transcripts
    if (!has(data, transcript) & rows.length > 0) {
      transcript = rows[0].transcript
    }

    const plotData = get(data, transcript, [])

    let domainPadding = { x: 25, y: 10 }
    let tickCount = plotData.length > 0 ? plotData.length : 1
    if (plotData.length > 25) {
      domainPadding = { x: 25, y: 10 }
      tickCount = 25
    }


    let yAxisLabel = 'Depth'
    let open = 'max_coverage'
    let close = 'min_coverage'
    let avg = 'avg_coverage'

    if (mode !== 'depth') {
      yAxisLabel = 'Mapping Quality'
      open = 'max_mapping_quality'
      close = 'min_mapping_quality'
      avg = 'avg_mapping_quality'
    }

    return (
      <Dimmer.Dimmable dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader>Loading Results</Loader>
        </Dimmer>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={domainPadding}
          width={1150}
        >
          <VictoryLegend
            x={100}
            y={10}
            centerTitle
            orientation="horizontal"
            style={{ border: { stroke: "black" }, labels: { fontSize: 10 } }}
            data={[
              { name: "Avgerage MQ ≥ 20 AND minimum DP ≥ 15", symbol: { fill: passColor } },
              { name: "Average MQ < 20 OR minimum DP < 15", symbol: { fill: warningColor } },
              { name: "Average MQ < 20 AND min DP < 15", symbol: { fill: errorColor } }
            ]}
          />
          <VictoryAxis
            axisLabelComponent={<VictoryLabel dy={23} />}
            label="Exons"
            tickCount={tickCount}
            tickFormat={(t) => `${parseInt(t, 10)}`}
            style={{
              axisLabel: { fontSize: 15, padding: 8 },
              tickLabels: { fontSize: 12 }
            }}
          />
          <VictoryAxis
            dependentAxis
            axisLabelComponent={<VictoryLabel dy={-30} />}
            label={yAxisLabel}
            tickCount={10}
            tickFormat={(t) => `${parseInt(t, 10)}`}
            style={{
              axisLabel: { fontSize: 15, padding: 20 },
              tickLabels: { fontSize: 12 }
            }}
          />
          <VictoryCandlestick
            style={{
              data: {
                fillOpacity: 0.35,
                strokeWidth: 1.5,
              }
            }}
            data={plotData}
            dataComponent={<Candle width={800} />}
            high={(datum) => datum[avg] + 3.5}  // TODO:  Add std. dev to the dataset
            open={open}
            low={(datum) => datum[avg] - 3.5}  // TODO:  Add std. dev to the dataset
            close={close}
            x="cds_exon"
            labels={(d) => d.cds_exon}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: 'white', fillOpacity: 0.70 }}
                style={{ fontSize: 12 }}
                height={110}
                width={175}
                cornerRadius={20}
                pointerLength={0}
                orientation="bottom"
                text={this.tooltipText}
              />
            }
          />
        </VictoryChart>
      </Dimmer.Dimmable>
    )
  }
}


Chart.propTypes = {
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
  mode: PropTypes.string,
  transcripts: PropTypes.string,
  coverage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quality: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  passColor: PropTypes.string,
  warningColor: PropTypes.string,
  errorColor: PropTypes.string,
}


Chart.defaultProps = {
  stats: {
    loading: false
  },
  mode: 'depth',
  transcripts: undefined,
  coverage: 15,
  quality: 20,
  passColor: '#13CE66',
  warningColor: '#FFC82C',
  errorColor: '#FF4949',
}


export default Chart

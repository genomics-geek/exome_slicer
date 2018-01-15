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
import { get, map, merge } from 'lodash'


class Chart extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: props.data,
      loading: props.loading,
      mode: props.mode,
      transcript: props.transcript,
      coverageFilter: parseInt(props.coverageFilter, 10),
      qualityFilter: parseInt(props.qualityFilter, 10),
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      data,
      loading,
      mode,
      transcript,
      coverageFilter,
      qualityFilter
    } = this.props

    if (data !== nextProps.data) {
      this.setState({ data:  nextProps.data })
    }

    if (loading !== nextProps.loading) {
      this.setState({ loading:  nextProps.loading })
    }

    if (mode !== nextProps.mode) {
      this.setState({ mode:  nextProps.mode })
    }

    if (transcript !== nextProps.transcript) {
      this.setState({ transcript:  nextProps.transcript })
    }

    if (coverageFilter !== nextProps.coverageFilter) {
      this.setState({ coverageFilter:  parseInt(nextProps.coverageFilter, 10) })
    }

    if (qualityFilter !== nextProps.qualityFilter) {
      this.setState({ qualityFilter:  parseInt(nextProps.qualityFilter, 10) })
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

  addFill = () => {
    const { data, coverageFilter, qualityFilter } = this.state
    const { passColor, warningColor, errorColor } = this.props
    const colorData = []

    map(data, element => {
      const coverage = get(element, 'min_coverage')
      const quality = get(element, 'avg_mapping_quality')
      const colors = {}

      if (coverage <= coverageFilter && quality <= qualityFilter) {
        colors.fill = errorColor
        colors.stroke = errorColor
      } else if (coverage <= coverageFilter || quality <= qualityFilter) {
        colors.fill = warningColor
        colors.stroke = warningColor
      } else {
        colors.fill = passColor
        colors.stroke = passColor
      }

      const coloredData = merge(element, colors)
      colorData.push(coloredData)
    })

    return colorData
  }

  render() {
    const { passColor, warningColor, errorColor } = this.props
    const { loading, data, mode } = this.state

    let tickCount = data.length
    let domainPadding = { x: 65, y: 25 }
    if (tickCount > 45) {
      tickCount = parseInt(tickCount / 5, 10)
      domainPadding = { x: 10, y: 10 }
    }

    let yAxisLabel = 'Depth'
    let open = 'max_coverage'
    let close = 'min_coverage'

    if (mode !== 'depth') {
      yAxisLabel = 'Mapping Quality'
      open = 'max_mapping_quality'
      close = 'min_mapping_quality'
    }

    const coloredData = this.addFill()

    return (
      <Dimmer.Dimmable dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader>Loading Results</Loader>
        </Dimmer>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={domainPadding}
          width={1500}
        >
          <VictoryLegend
            x={100}
            y={10}
            centerTitle
            orientation="horizontal"
            style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
            data={[
              { name: "Pass", symbol: { fill: passColor } },
              { name: "Warning", symbol: { fill: warningColor } },
              { name: "Failure", symbol: { fill: errorColor } }
            ]}
          />
          <VictoryAxis
            axisLabelComponent={<VictoryLabel dy={25} />}
            label="Exons"
            tickCount={tickCount}
            tickFormat={(t) => `${parseInt(t, 10)}`}
            style={{
              axisLabel: { fontSize: 15 },
              tickLabels: { fontSize: 12 }
            }}
          />
          <VictoryAxis
            dependentAxis
            axisLabelComponent={<VictoryLabel dy={-25} />}
            label={yAxisLabel}
            tickCount={tickCount}
            tickFormat={(t) => `${parseInt(t, 10)}`}
            style={{
              axisLabel: { fontSize: 15 },
              tickLabels: { fontSize: 12 }
            }}
          />
          <VictoryCandlestick
            style={{
              data: {
                fillOpacity: 0.75,
                strokeWidth: 3,
              }
            }}
            data={coloredData}
            dataComponent={<Candle width={750} />}
            high={open}  // TODO:  Add std. dev to the dataset
            open={open}
            low={close}  // TODO:  Add std. dev to the dataset
            close={close}
            x="cds_exon"
            labels={(d) => d.cds_exon}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: 'white', fillOpacity: 0.90 }}
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
  mode: PropTypes.string,
  transcript: PropTypes.string,
  coverageFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  qualityFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  passColor: PropTypes.string,
  warningColor: PropTypes.string,
  errorColor: PropTypes.string,
}


Chart.defaultProps = {
  data: [],
  loading: false,
  mode: 'depth',
  transcript: undefined,
  coverageFilter: 15,
  qualityFilter: 20,
  passColor: '#13CE66',
  warningColor: '#FFC82C',
  errorColor: '#FF4949',
}


export default Chart

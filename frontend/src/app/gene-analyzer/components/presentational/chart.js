import React from 'react'
import PropTypes from 'prop-types'
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


const passColor = '#13CE66'
const warningColor = '#FFC82C'
const errorColor = '#FF4949'


const prepareData = (rows, coverageCutoff = 15, qualityCutoff = 30) => {
  const data = {}
  map(rows, element => {
    const depth = get(element, 'minCoverage')
    const mappingQuality = get(element, 'avgMappingQuality')
    const newData = {}
    if (depth <= coverageCutoff && mappingQuality <= qualityCutoff) {
      newData.fill = errorColor
      newData.stroke = errorColor
    } else if (depth <= coverageCutoff || mappingQuality <= qualityCutoff) {
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


const tooltipText = datum => {
  return `cds exon: ${datum.cdsExon}
    min coverage: ${datum.minCoverage}
    avg coverage: ${datum.avgCoverage}
    max coverage: ${datum.maxCoverage}
    min mapping quality: ${datum.minMappingQuality}
    avg mapping quality: ${datum.avgMappingQuality}
    max mapping quality: ${datum.maxMappingQuality}`
}


const Chart = ({ mode, coverageCutoff, qualityCutoff, transcript, rows }) => {
  const data = prepareData(rows, coverageCutoff, qualityCutoff)

  let selectedTranscript = transcript
  if (!has(data, transcript) & rows.length > 0) {
    selectedTranscript = rows[0].transcript
  }

  const plotData = get(data, selectedTranscript, [])

  let domainPadding = { x: 25, y: 10 }
  let tickCount = plotData.length > 0 ? plotData.length : 1
  if (plotData.length > 25) {
    domainPadding = { x: 25, y: 10 }
    tickCount = 25
  }

  let yAxisLabel = 'Depth'
  let open = 'maxCoverage'
  let close = 'minCoverage'
  let avg = 'avgCoverage'

  if (mode !== 'depth') {
    yAxisLabel = 'Mapping Quality'
    open = 'maxMappingQuality'
    close = 'minMappingQuality'
    avg = 'avgMappingQuality'
  }

  return (
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
          {
            name: `Avg. ${qualityCutoff} AND min. DP ≥ ${coverageCutoff}`,
            symbol: { fill: passColor }
          },
          {
            name: `Avg. < ${qualityCutoff} OR min. DP < ${coverageCutoff}`,
            symbol: { fill: warningColor }
          },
          {
            name: `Avg. < ${qualityCutoff} AND min. DP < ${coverageCutoff}`,
            symbol: { fill: errorColor }
          }
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
        high={datum => datum[avg] + 3.5}  // TODO:  Add std. dev to the dataset
        open={open}
        low={datum => datum[avg] - 3.5}  // TODO:  Add std. dev to the dataset
        close={close}
        x="cdsExon"
        labels={d => d.cdsExon}
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{ fill: 'white', fillOpacity: 0.70 }}
            style={{ fontSize: 12 }}
            height={110}
            width={175}
            cornerRadius={20}
            pointerLength={0}
            orientation="bottom"
            text={tooltipText}
          />
        }
      />
    </VictoryChart>
  )
}


Chart.propTypes = {
  mode: PropTypes.oneOf(['depth', 'quality']),
  coverageCutoff: PropTypes.number,
  qualityCutoff: PropTypes.number,
  transcript: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    gene: PropTypes.string,
    transcript: PropTypes.string,
    cdsExon: PropTypes.number,
    numberOfBaits: PropTypes.number,
    pctBasesCoveredByBaits: PropTypes.number,
    minMappingQuality: PropTypes.number,
    maxMappingQuality: PropTypes.number,
    avgMappingQuality: PropTypes.number,
    minCoverage: PropTypes.number,
    maxCoverage: PropTypes.number,
    avgCoverage: PropTypes.number,
  })),
}


Chart.defaultProps = {
  mode: 'depth',
  coverageCutoff: 15,
  qualityCutoff: 30,
  rows: [],
}


export default Chart

import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Segment } from 'semantic-ui-react'
import { get } from 'lodash'

const ToolTip = ({
  point: {
    serieId,
    data: { x, y },
  },
}) => (
  <Segment>
    Exon: <strong>{x}</strong>; {serieId}: <strong>{y}</strong>
  </Segment>
)

const Chart = ({ yLegend, data = [], threshold }) => {
  const exons = get(data, '[0].data').length
  return (
    <ResponsiveLine
      data={data}
      tooltip={ToolTip}
      margin={{ top: 10, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      axisTop={null}
      axisRight={null}
      axisBottom={
        exons > 20
          ? null
          : {
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Exons',
              legendOffset: 36,
              legendPosition: 'middle',
            }
      }
      axisLeft={{
        orient: 'left',
        legend: yLegend,
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      colors={{ scheme: 'set2' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      markers={
        threshold
          ? [
              {
                axis: 'y',
                value: threshold,
                lineStyle: { stroke: '#b0413e', strokeWidth: 3 },
                legend: 'Threshold',
                legendOrientation: 'horizontal',
              },
            ]
          : undefined
      }
    />
  )
}

export default Chart

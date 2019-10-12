import { get, map } from 'lodash'

export const parseQuery = data => {
  const rows = []
  const maxDepth = []
  const maxMQ = []
  const avgDepth = []
  const avgMQ = []
  const minDepth = []
  const minMQ = []
  let selectedTranscript

  map(get(data, 'allQualityStats.edges', []), row => {
    const node = get(row, 'node')
    const transcript = get(node, 'transcript')
    if (!selectedTranscript) selectedTranscript = transcript

    if (selectedTranscript === transcript) {
      rows.push(node)
      minDepth.push({
        x: get(node, 'cdsExon'),
        y: get(node, 'minCoverage'),
      })
      maxDepth.push({
        x: get(node, 'cdsExon'),
        y: get(node, 'maxCoverage'),
      })
      avgDepth.push({
        x: get(node, 'cdsExon'),
        y: get(node, 'avgCoverage'),
      })
      minMQ.push({
        x: get(node, 'cdsExon'),
        y: get(node, 'minMappingQuality'),
      })
      maxMQ.push({
        x: get(node, 'cdsExon'),
        y: get(node, 'maxMappingQuality'),
      })
      avgMQ.push({
        x: get(node, 'cdsExon'),
        y: get(node, 'avgMappingQuality'),
      })
    }
  })

  const depthDataSet = [
    {
      id: 'Min DP',
      data: minDepth,
    },
    {
      id: 'Avg DP',
      data: avgDepth,
    },
    {
      id: 'Max DP',
      data: maxDepth,
    },
  ]

  const mappingQualityDataSet = [
    {
      id: 'Min MQ',
      data: minMQ,
    },
    {
      id: 'Avg MQ',
      data: avgMQ,
    },
    {
      id: 'Max MQ',
      data: maxMQ,
    },
  ]

  return { rows, depthDataSet, mappingQualityDataSet }
}

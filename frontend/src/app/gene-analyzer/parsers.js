import { get, map } from 'lodash'

export const parseQuery = data => {
  const rows = []
  const maxDepth = []
  const maxMQ = []
  const avgDepth = []
  const avgMQ = []
  const minDepth = []
  const minMQ = []

  map(get(data, 'allQualityStats.edges', []), row => {
    const node = get(row, 'node')
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
  })

  const depthDataSet = [
    {
      id: "Minimum Depth",
      data: minDepth
    },
    {
      id: "Average Depth",
      data: avgDepth
    },
    {
      id: "Max Depth",
      data: maxDepth
    }
  ]

  const mappingQualityDataSet = [
    {
      id: "Minimum Mapping Quality",
      data: minMQ
    },
    {
      id: "Average Mapping Quality",
      data: avgMQ
    },
    {
      id: "Max Mapping Quality",
      data: maxMQ
    }
  ]

  return { rows, depthDataSet, mappingQualityDataSet }
}

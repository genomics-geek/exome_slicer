import { get, map } from 'lodash'

export const parseQuery = data => {
  const rows = []
  const maxDepth = []
  const avgDepth = []
  const minDepth = []


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

  return { rows, depthDataSet }
}

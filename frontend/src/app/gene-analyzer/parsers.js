import { get, map } from 'lodash'

export const parseQuery = data => {
  return map(get(data, 'allQualityStats.edges', []), row => get(row, 'node'))
}

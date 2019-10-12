import React from 'react'
import { get, map } from 'lodash'

import { GENES as QUERY } from './queries'
import SearchDropdown from './search-dropdown'

export const reformatOptions = data => map(get(data, 'allGenes', []), element => ({
  key: get(element, 'gene'),
  value: get(element, 'gene'),
  text: get(element, 'gene')
}))

const GenesDropdown = props => (
  <SearchDropdown
    query={QUERY}
    variables={{ search: '', symbol: props.symbol }}
    searchVariable="search"
    initialVariables={['symbol']}
    reformatOptions={reformatOptions}
    {...props}
  />
)

export default GenesDropdown

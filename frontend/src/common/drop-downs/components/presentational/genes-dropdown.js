import React from 'react'
import { get, map } from 'lodash'

import { QUERY } from '../../queries/genes'
import { SearchDropdown } from 'common/drop-downs'


export const reformatOptions = data => map(get(data, 'allGenes', []), element => ({
  key: get(element, 'gene'),
  value: get(element, 'gene'),
  text: get(element, 'gene')
}))


const GenesDropdown = props => (
  <SearchDropdown
    query={QUERY}
    variables={{ search: '' }}
    searchVariable="search"
    reformatOptions={reformatOptions}
    {...props}
  />
)


export default GenesDropdown

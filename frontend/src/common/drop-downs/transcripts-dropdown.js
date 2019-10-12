import React from 'react'
import PropTypes from 'prop-types'
import { get, map } from 'lodash'

import { TRANSCRIPTS as QUERY } from './queries'
import SearchDropdown from './search-dropdown'

export const reformatOptions = data => map(get(data, 'allTranscripts', []), element => ({
  key: get(element, 'transcript'),
  value: get(element, 'transcript'),
  text: get(element, 'transcript')
}))

const TranscriptsDropdown = props => (
  <SearchDropdown
    query={QUERY}
    variables={{ search: '', gene: props.gene, transcript: props.transcript }}
    searchVariable="search"
    initialVariables={['transcript']}
    reformatOptions={reformatOptions}
    {...props}
  />
)

TranscriptsDropdown.propTypes = {
  gene: PropTypes.string.isRequired,
}

export default TranscriptsDropdown

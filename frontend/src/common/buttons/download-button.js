import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { CSVLink } from 'react-csv'


const headers = [
  {label: 'Gene', key: 'gene'},
  {label: 'Transcript', key: 'transcript'},
  {label: 'CDS Exon', key: 'cdsExon'},
  {label: '# of Baits', key: 'numberOfBaits'},
  {label: '% of Bases Covered by Baits', key: 'pctBasesCoveredByBaits'},
  {label: 'Avg. Mapping Quality', key: 'avgMappingQuality'},
  {label: 'Min. Coverage', key: 'minCoverage'},
]


const DownloadButton = ({ data, headers, filename, ...rest }) => (
  <CSVLink data={data} headers={headers} filename={filename}>
    <Button content="Download" icon="download" {...rest} />
  </CSVLink>
)


DownloadButton.propTypes = {
  filename: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.string,
  })),
  data: PropTypes.array
}


DownloadButton.defaultProps = {
  headers: headers,
  data: []
}


export default DownloadButton

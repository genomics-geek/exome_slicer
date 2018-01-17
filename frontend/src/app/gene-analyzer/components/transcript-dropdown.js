import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import { get, map } from 'lodash'


class TranscriptDropdown extends React.PureComponent {
  constructor(props) {
    super(props)

    const data = get(props.transcriptOptions, 'data.results', [])
    const loading = get(props.transcriptOptions, 'loading', false)
    const choices = []
    const options = map(data, element => {
      choices.push(element.transcript)
      return (
        {
          key: element.transcript,
          value: element.transcript,
          text: element.transcript
        }
      )
    })

    let defaultValue = props.transcripts
    if (!choices.includes(defaultValue) & data.length > 0) {
      defaultValue = data[0].transcript
    }

    this.state = {
      options,
      loading,
      defaultValue,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { transcriptOptions, updateFilter } = this.props

    if (transcriptOptions !== nextProps.transcriptOptions) {
      const data = get(nextProps.transcriptOptions, 'data.results', [])
      const loading = get(nextProps.transcriptOptions, 'loading', false)
      if (data.length > 0) {
        const defaultValue = data[0].transcript
        updateFilter(defaultValue)
        this.setState({ defaultValue })
      }

      const options = map(data, element => ({
        key: element.transcript,
        value: element.transcript,
        text: element.transcript
      }))

      this.setState({ options, loading })
    }
  }

  render() {
    const {
      updateFilter,
      transcripts,
      transcriptOptions,
      ...rest
    } = this.props

    return (
      <Dropdown
        selection
        {...this.state}
        {...rest}
      />
    )
  }
}


TranscriptDropdown.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  transcripts: PropTypes.string,
  transcriptOptions: PropTypes.shape({
    loading: PropTypes.bool,
    requestType: PropTypes.string,
    status: PropTypes.number,
    data: PropTypes.shape({
      count: PropTypes.number,
      next: PropTypes.string,
      previous: PropTypes.string,
      results: PropTypes.arrayOf(PropTypes.shape({
        gene: PropTypes.string
      }))
    }),
    error: PropTypes.string,
  }),
}

TranscriptDropdown.defaultProps = {
  transcriptOptions: {
    loading: false,
  },
}


export default TranscriptDropdown

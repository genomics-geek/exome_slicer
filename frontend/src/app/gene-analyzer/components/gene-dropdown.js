import React from 'react'
import PropTypes from 'prop-types'
import { AutoCompleteDropDown } from 'react-genomix'
import { get, map } from 'lodash'


class GeneDropdown extends React.PureComponent {
  constructor(props) {
    super(props)

    const data = get(props.geneOptions, 'data.results', [])
    const loading = get(props.geneOptions, 'loading', false)
    const options = map(data, element => ({
      key: element.gene,
      value: element.gene,
      text: element.gene
    }))

    this.state = {
      options,
      loading,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { geneOptions } = this.props

    if (geneOptions !== nextProps.geneOptions) {
      const data = get(nextProps.geneOptions, 'data.results', [])
      const loading = get(nextProps.geneOptions, 'loading', false)
      const options = map(data, element => ({
        key: element.gene,
        value: element.gene,
        text: element.gene
      }))
      this.setState({ options, loading })
    }
  }

  searchAction = data => {
    const { searchAction } = this.props
    searchAction(data)
  }

  render() {
    const { options, loading } = this.state
    const { geneOptions, updateFilter, ...rest } = this.props

    return (
      <AutoCompleteDropDown
        endpoint="?limit=25&search="
        searchAction={this.searchAction}
        options={options}
        loading={loading}
        {...rest}
      />
    )
  }
}

GeneDropdown.propTypes = {
  searchAction: PropTypes.func.isRequired,
  geneOptions: PropTypes.shape({
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


GeneDropdown.defaultProps = {
  geneOptions: {
    loading: false,
  },
}


export default GeneDropdown

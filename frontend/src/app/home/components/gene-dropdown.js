import React from 'react'
import PropTypes from 'prop-types'
import { AutoCompleteDropDown } from 'react-genomix'
import { withRouter } from "react-router-dom"
import { get, map } from 'lodash'


class GeneDropdown extends React.PureComponent {
  constructor(props) {
    super(props)

    const data = get(props.options, 'data.results', [])
    const loading = get(props.options, 'loading', false)
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
    const { options } = this.props

    if (options !== nextProps.options) {
      const data = get(nextProps.options, 'data.results', [])
      const loading = get(nextProps.options, 'loading', false)
      const newOptions = map(data, element => ({
        key: element.gene,
        value: element.gene,
        text: element.gene
      }))
      this.setState({ options: newOptions, loading })
    }
  }

  handleChange = (e, { name, value }) => {
    const { updateFilter, searchAction, history } = this.props

    updateFilter(name, value)
    searchAction('stats', `?genes=${value}`)
    history.push('/app/gene-analyzer/')
  }

  searchAction = data => {
    const { name, searchAction } = this.props
    searchAction(name, data)
  }

  render() {
    const { options, loading } = this.state

    return (
      <AutoCompleteDropDown
        name="genes"
        selection
        fluid
        endpoint="?limit=25&search="
        onChange={this.handleChange}
        searchAction={this.searchAction}
        options={options}
        loading={loading}
      />
    )
  }
}

GeneDropdown.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  searchAction: PropTypes.func.isRequired,
  options: PropTypes.shape({
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
  options: {
    loading: false,
  },
}


export default withRouter(GeneDropdown)

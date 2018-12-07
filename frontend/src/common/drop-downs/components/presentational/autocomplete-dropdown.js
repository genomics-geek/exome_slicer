import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import { find, map, union, uniqBy } from 'lodash'
import update from 'immutability-helper'


class AutocompleteDropdown extends React.Component {
  state = { selectedValue: this.props.multiple ? [] : null }

  componentDidMount() {
    this.timeout = null
  }

  onSearchChange = (e, { searchQuery }) => {
    const { refetch, searchVariable, initialVariables } = this.props

    if (refetch) {
      clearTimeout(this.timeout)

      const variables = { [searchVariable]: searchQuery }
      let newVariables = update({}, {$merge: variables})

      // NOTE: This is to wipe out initialVariables from refetch!
      map(initialVariables, variable => {
        newVariables = update(newVariables, {[variable]: {$set: ""}})
      })

      this.timeout = setTimeout(() => refetch(newVariables), 500)
    }
  }

  onChange = (e, { name, value, options }) => {
    const { onChange, multiple } = this.props

    if (onChange) onChange(e, { name, value })

    if (!multiple) {
      const selectedValue = find(options, ['value', value])
      this.setState({ selectedValue })
    }

    else {
      const selectedValue = map(value, item => find(options, ['value', item]))
      this.setState({ selectedValue })
    }
  }

  prepareOptions = options => {
    const { multiple } = this.props
    const { selectedValue } = this.state

    if (multiple && selectedValue.length > 0) {
      return uniqBy(union(options, selectedValue), 'key')
    }

    else if (!multiple && selectedValue) {
      return uniqBy(union(options, [selectedValue]), 'key')
    }

    else {
      return options
    }
  }

  render() {
    const { onChange, options, refetch, searchVariable, initialVariables, control, ...rest } = this.props
    return (
      <Dropdown
        options={this.prepareOptions(options)}
        onChange={this.onChange}
        onSearchChange={this.onSearchChange}
        {...rest}
      />
    )
  }
}

// NOTE: initialVariables is used to initially load options, but is wiped out on subsequent searches
AutocompleteDropdown.propTypes = {
  onChange: PropTypes.func,
  refetch: PropTypes.func,
  searchVariable: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  initialVariables: PropTypes.arrayOf(PropTypes.string),
}


AutocompleteDropdown.defaultProps = {
  options: [],
  initialVariables: [],
}


export default AutocompleteDropdown

import React from 'react'
import { AutoCompleteDropDown } from 'react-genomix'


class GeneSearchInput extends React.PureComponent {
  render() {
    return (
      <AutoCompleteDropDown
        className="gene-search-input"
        label="Gene"
        name="gene"
        search
        selection
        fluid
        endpoint="testAPI?search="
        onChange={(props) => alert(JSON.stringify(props))}
        searchAction={(props) => alert(JSON.stringify(props))}
      />
    )
  }
}


export default GeneSearchInput

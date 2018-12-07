import React from 'react'

import PropTypes from 'prop-types'
import { withAlert } from 'react-alert'


export class Alert extends React.Component {

  componentDidMount() {
    const { alert, type, message } = this.props

    if (type==="error") alert.error(message)
    else if (type==="success") alert.success(message)
    else alert.info(message)
  }

  render() {
    return <div id="alert-notifications" />
  }
}


Alert.propTypes = {
  type: PropTypes.oneOf(["info", "error", "success"]),
  message: PropTypes.string.isRequired,
}


export default withAlert(Alert)

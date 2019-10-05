import React from 'react'
import PropTypes from 'prop-types'
import { useAlert } from 'react-alert'

export const Alert = ({ type, message }) => {
  const alert = useAlert()
  if (type==="error") alert.error(message)
  else if (type==="success") alert.success(message)
  else alert.info(message)
  return <div id="alert-notifications" />
}

Alert.propTypes = {
  type: PropTypes.oneOf(["info", "error", "success"]),
  message: PropTypes.string.isRequired,
}

export default Alert

import React from 'react'

import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'


// Should be passed to the Alert Provider as props
export const alertOptions = {
  position: 'top center',
  timeout: 4000,
  offset: '8px',
  transition: 'fade',
  zIndex: 2000,
}


export const getColor = type => {
  if (type==='error') return 'red'
  else if (type==='info') return 'blue'
  else if (type==='success') return 'green'
  return 'grey'
}


export const getIcon = type => {
  if (type==='error') return 'exclamation circle'
  else if (type==='info') return 'info circle'
  else if (type==='success') return 'check circle'
  return 'question'
}


const AlertTemplate = ({ message, options, style, close }) => (
  // the style contains only the margin given as offset
  // options contains all alert given options
  // message is the alert message...
  // close is a function that closes the alert
  <Message
    style={style}
    content={message}
    color={getColor(options.type)}
    icon={getIcon(options.type)}
    onDismiss={close}
    size="large"
  />
)


AlertTemplate.propTypes = {
  close: PropTypes.func.isRequired,
  message: PropTypes.any.isRequired,
  options: PropTypes.shape({
    type: PropTypes.string
  }),
  style: PropTypes.shape({}),
}


AlertTemplate.defaultProps = {
  options: {},
  style: alertOptions,
}


export default AlertTemplate

import React from 'react'
import PropTypes from 'prop-types'
import { Dimmer, Loader, Message, Segment } from 'semantic-ui-react'


const DimmerLoading = props => {
  const { fullpage, message, ...rest } = props
  return (
    <Segment>
      <Dimmer active page={fullpage}>
        <Loader content={message} {...rest} />
      </Dimmer>
      <Message content={message} />
    </Segment>
  )
}


DimmerLoading.propTypes = {
  fullpage: PropTypes.bool,
  message: PropTypes.string,
}


DimmerLoading.defaultProps = {
  fullpage: false,
  message: "Fetching data..."
}


export default DimmerLoading

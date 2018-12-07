import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider, Message, Modal } from 'semantic-ui-react'


const InfoModal = () => (
  <Modal
    trigger={
      <Button
        content="How to use"
        icon="question"
        color="facebook"
      />
    }
  >
    <Modal.Header content="How to use Batch Analyzer" />
    <Modal.Content>
      <Message>
        <Message.List>
          <Message.Item content="Select genes of interest" />
          <Message.Item content="Set coverage and quality cutoffs" />
          <Message.Item content="Save filters" />
        </Message.List>
        <Divider hidden />
        <Message.Header content="This will return any regions that meet your filters!"/>
      </Message>
    </Modal.Content>
  </Modal>
)


InfoModal.propTypes = {
  setFilter: PropTypes.func,
  filters: PropTypes.shape({
    genesIn: PropTypes.string,
    qualityFilters: PropTypes.string,
  })
}


export default InfoModal

import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

import ContactForm from './ContactForm'

const AddNewContactModal = ({ visible, setVisible, createContact }) => {
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add new contact</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ContactForm actionFunction={createContact} />
        </CModalBody>
      </CModal>
    </>
  )
}
export default AddNewContactModal

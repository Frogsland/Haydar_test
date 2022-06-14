import React from 'react'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import ContactForm from './ContactForm'

const UpdateContactModal = ({ visible, setVisible, updateContact, selectedContact }) => {
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Edit contact</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ContactForm actionFunction={updateContact} defaultValues={selectedContact} />
        </CModalBody>
      </CModal>
    </>
  )
}

export default UpdateContactModal

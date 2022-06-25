import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const DeleteConfirmationModal = ({ visible, setVisible, deleteContact, itemToDelete }) => {
  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Delete contact</CModalTitle>
      </CModalHeader>
      <CModalBody>Are you sure?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="danger" onClick={() => deleteContact(itemToDelete)}>
          Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteConfirmationModal

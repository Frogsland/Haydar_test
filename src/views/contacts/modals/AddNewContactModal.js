import React from "react";
import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";

import ContactForm from "../components/ContactForm";

const AddNewContactModal = ({ visible, setVisible, createContact }) => {
  return (
    <>
      <CModal
        size="lg"
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Add new contact</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ContactForm
            actionFunction={createContact}
            visible={visible}
            setVisible={setVisible}
          />
        </CModalBody>
      </CModal>
    </>
  );
};
export default AddNewContactModal;

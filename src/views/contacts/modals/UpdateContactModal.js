import React from "react";
import { CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import ContactForm from "../components/ContactForm";

const UpdateContactModal = ({
  visible,
  setVisible,
  updateContact,
  selectedContact,
}) => {
  return (
    <>
      <CModal
        size="lg"
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Edit contact</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ContactForm
            actionFunction={updateContact}
            defaultValues={selectedContact}
            visible={visible}
            setVisible={setVisible}
          />
        </CModalBody>
      </CModal>
    </>
  );
};

export default UpdateContactModal;

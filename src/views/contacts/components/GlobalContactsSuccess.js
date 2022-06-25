import React from "react";
import { CRow } from "@coreui/react";
import success from "src/assets/images/success.svg";
export const GlobalContactsSuccess = ({ contactsCount }) => {
  return (
    <>
      <CRow className="justify-content-center">
        <img
          className="d-block"
          src={success}
          alt="empty"
          width="90px"
          height="90px"
        />
      </CRow>
      <CRow className="justify-content-center">
        <p className="text-center mt-3">Loaded {contactsCount} contact(s)</p>
      </CRow>
    </>
  );
};

export default GlobalContactsSuccess;

import React from "react";
import { CButton, CCol, CRow } from "@coreui/react";

export const GlobalContactsAsk = ({ visible, setVisible, loadData }) => {
  return (
    <>
      <CRow>
        <p>Are you sure you want to load contacts from global databases?</p>
      </CRow>
      <CRow className="mt-3">
        <CCol md={12} className="d-flex justify-content-end">
          <CButton
            color="secondary"
            className="mx-3 text-white"
            onClick={() => setVisible(!visible)}
          >
            Cancel
          </CButton>
          <CButton color="primary" type="submit" onClick={() => loadData()}>
            Load data
          </CButton>
        </CCol>
      </CRow>
    </>
  );
};

export default GlobalContactsAsk;

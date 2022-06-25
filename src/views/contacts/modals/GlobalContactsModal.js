import React from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from "@coreui/react";
import GlobalContactsAsk from "../components/GlobalContactsAsk";
import GlobalContactsSuccess from "../components/GlobalContactsSuccess";

export const GlobalContactsModal = ({
  visible,
  setVisible,
  pending,
  loaded,
  contactsCount,
  setContactsCount,
  loadData,
}) => {
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => {
          setContactsCount(0);
          setVisible(false);
        }}
      >
        <CModalHeader>
          <CModalTitle>Load global contacts</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {!loaded && !pending && (
            <GlobalContactsAsk
              visible={visible}
              setVisible={setVisible}
              loadData={loadData}
            />
          )}
          {pending && (
            <CRow className="justify-content-center">
              <CSpinner
                color="success"
                style={{ width: "90px", height: "90px" }}
              />
            </CRow>
          )}
          {loaded && <GlobalContactsSuccess contactsCount={contactsCount} />}
        </CModalBody>
      </CModal>
    </>
  );
};

import React from "react";
import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilGlobeAlt,
  cilPencil,
  cilTrash,
  cilUser,
} from "@coreui/icons/js/free";

const ContactsTable = ({ contacts, editContactHandler, handleDeletedItem }) => {
  return (
    <CTable align="middle" className="mb-0 border w-100" hover responsive>
      <CTableHead color="light">
        <CTableRow className="bg-white">
          <CTableHeaderCell className="text-muted">First name</CTableHeaderCell>
          <CTableHeaderCell className="text-muted">Last name</CTableHeaderCell>
          <CTableHeaderCell className="text-muted">Address</CTableHeaderCell>
          <CTableHeaderCell className="text-muted">Email</CTableHeaderCell>
          <CTableHeaderCell className="text-muted">
            Phone number
          </CTableHeaderCell>
          <CTableHeaderCell className="text-muted">Type</CTableHeaderCell>
          <CTableHeaderCell className="text-center text-muted">
            Actions
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {contacts?.map((item) => (
          <CTableRow v-for="item in tableItems" key={item.id}>
            <CTableDataCell>
              <div>{item.firstName}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.lastName}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.address}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.email}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.phone}</div>
            </CTableDataCell>
            {item.type === "global" ? (
              <CTableDataCell className="text-center">
                <CIcon icon={cilGlobeAlt} size="lg" />
              </CTableDataCell>
            ) : (
              <CTableDataCell className="text-center">
                <CIcon icon={cilUser} size="lg" />
              </CTableDataCell>
            )}
            <CTableDataCell className="text-center">
              <CRow className="mx-0 justify-content-center">
                <CCol xs={4}>
                  <CButton
                    onClick={() => editContactHandler(item)}
                    className="mr-3"
                    color="primary"
                  >
                    <CIcon icon={cilPencil} size="lg" />
                  </CButton>
                </CCol>
                <CCol xs={4}>
                  <CButton
                    color="danger"
                    onClick={() => handleDeletedItem(item.id)}
                  >
                    <CIcon icon={cilTrash} size="lg" fill="white" />
                  </CButton>
                </CCol>
              </CRow>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default ContactsTable;

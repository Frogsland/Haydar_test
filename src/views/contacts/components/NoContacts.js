import {CButton, CRow} from "@coreui/react";
import NoContent from 'src/assets/images/empty_box.svg'
import React from "react";
const NoContacts= ({createContactModal,setCreateContactModal}) => {
    return (
        <CRow className="w-100 h-100 justify-content-center align-items-center mt-5">
            <CRow className="justify-content-center align-items-center">
                <img className="d-block" src={NoContent} alt="empty" width="90px" height="90px" />
            </CRow>
            <CRow className="justify-content-center align-items-center">
                <h3 className="d-flex justify-content-center align-items-center">No contacts here!</h3>
            </CRow >
            <CRow className="justify-content-center align-items-center">
                <p className="d-flex justify-content-center align-items-center w-25 text-center">Your contact list is empty. But you can add your first contact</p>
            </CRow>
            <CRow className="justify-content-center align-items-center">
                <CButton
                    color="primary"
                    variant="outline"
                    className="d-flex w-25  justify-content-center align-items-center"
                    onClick={() => setCreateContactModal(!createContactModal)}
                >
                    Create contact
                </CButton>
            </CRow>
        </CRow>
    );
};

export default NoContacts;

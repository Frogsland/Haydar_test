import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked } from "@coreui/icons";
import { useAuth } from "../../../contexts/AuthContext";
import { firestoreDB } from "../../../firebase";
import { Timestamp, setDoc, doc } from "firebase/firestore";

const Register = () => {
  const [errorState, setErrorState] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const handleSignUp = () => {
    try {
      signup(emailRef.current.value, passwordRef.current.value)
        .then((res) => {
          setDoc(doc(firestoreDB, `users`, res.user.uid), {
            email: res.user.email,
            type: "user",
            contacts: [],
            created: Timestamp.now(),
          });
          setErrorState(false);
          navigate("/");
        })
        .catch(() => {
          setErrorState(!errorState);
        });
    } catch (e) {
      setErrorState(!errorState);
    }
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  {errorState ? (
                    <CAlert color="danger">Failed to sign up</CAlert>
                  ) : null}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      ref={emailRef}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      ref={passwordRef}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton onClick={handleSignUp} color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;

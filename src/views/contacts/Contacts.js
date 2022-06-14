import React, { useEffect, useState } from 'react'
import {
  doc,
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

import { firestoreDB } from '../../firebase'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons/js/free'

import AddNewContactModal from './AddNewContactModal'
import UpdateContactModal from './UpdateContactModal'
import DeleteConfirmationModal from './DeleteConfirmationModal'

const Contacts = () => {
  const [addContactVisibility, setAddContactVisibility] = useState(false)
  const [editContactVisibility, setEditContactVisibility] = useState(false)
  const [deleteConfirmationVisibility, setDeleteConfirmationVisibility] = useState(false)
  const [deleteItemId, setDeleteItemId] = useState('')
  const [contactsList, setContactsList] = useState([])
  const [selectedContact, setSelectedContact] = useState({})

  useEffect(() => {
    const q = query(collection(firestoreDB, 'contacts'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setContactsList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      )
    })
  }, [])

  const editContactHandler = (contact) => {
    setSelectedContact(contact)
    setEditContactVisibility(!editContactVisibility)
  }
  const handleDeletedItem = (id) => {
    setDeleteItemId(id)
    setDeleteConfirmationVisibility(true)
  }

  const postNewContact = async (data) => {
    try {
      await addDoc(collection(firestoreDB, 'contacts'), {
        ...data,
        created: Timestamp.now(),
      })
      setAddContactVisibility(false)
    } catch (err) {
      alert(err)
    }
  }

  const deleteContact = async (id) => {
    const taskDocRef = doc(firestoreDB, 'contacts', id)
    try {
      await deleteDoc(taskDocRef)
      setDeleteConfirmationVisibility(false)
    } catch (err) {
      alert(err)
    }
  }

  const updateContact = async (data, id) => {
    const contactDocRef = doc(firestoreDB, 'contacts', id)
    try {
      await updateDoc(contactDocRef, {
        ...data,
      })
      setEditContactVisibility(false)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <AddNewContactModal
        visible={addContactVisibility}
        setVisible={setAddContactVisibility}
        createContact={postNewContact}
      />
      <UpdateContactModal
        visible={editContactVisibility}
        setVisible={setEditContactVisibility}
        updateContact={updateContact}
        selectedContact={selectedContact}
      />
      <DeleteConfirmationModal
        visible={deleteConfirmationVisibility}
        setVisible={setDeleteConfirmationVisibility}
        deleteContact={deleteContact}
        itemToDelete={deleteItemId}
      />
      <CRow>
        <CCol xs>
          <CRow className="mb-3 justify-content-end">
            <CCol className="justify-content-end d-flex" xs={2}>
              <CButton
                color="success"
                className="text-white"
                onClick={() => setAddContactVisibility(!addContactVisibility)}
              >
                Add new
              </CButton>
            </CCol>
          </CRow>
          <CCard className="mb-4">
            <CCardHeader>Contacts list</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>First name</CTableHeaderCell>
                    <CTableHeaderCell>Last name</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Phone number</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {contactsList?.map((item) => (
                    <CTableRow v-for="item in tableItems" key={item.id}>
                      <CTableDataCell>
                        <div>{item.data.firstName}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.data.lastName}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.data.address}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.data.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.data.phone}</div>
                      </CTableDataCell>
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
                            <CButton color="danger" onClick={() => handleDeletedItem(item.id)}>
                              <CIcon icon={cilTrash} size="lg" fill="white" />
                            </CButton>
                          </CCol>
                        </CRow>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Contacts

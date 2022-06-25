import React, { useEffect, useState } from "react";
import {
  doc,
  collection,
  query,
  onSnapshot,
  updateDoc,
  getDoc,
  getDocs,
  runTransaction,
} from "firebase/firestore";

import { firestoreDB } from "../../firebase";
import { CButton, CCol, CRow } from "@coreui/react";

import AddNewContactModal from "./modals/AddNewContactModal";
import UpdateContactModal from "./modals/UpdateContactModal";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import { useAuth } from "../../contexts/AuthContext";
import ContactsTable from "./components/ContactsTable";
import NoContacts from "./components/NoContacts";
import { GlobalContactsModal } from "./modals/GlobalContactsModal";
import { removeDuplicates } from "../../helpers/removeDuplicates";

const Contacts = () => {
  const [addContactVisibility, setAddContactVisibility] = useState(false);
  const [editContactVisibility, setEditContactVisibility] = useState(false);
  const [globalContactsVisibility, setGlobalContactsVisibility] = useState(
    false
  );
  const [loaded, setLoaded] = useState(false);
  const [pending, setPending] = useState(false);
  const [globalContactsCount, setGlobalContactsCount] = useState(0);
  const [
    deleteConfirmationVisibility,
    setDeleteConfirmationVisibility,
  ] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [contactsList, setContactsList] = useState([]);
  const [addRemoveGlobal, setAddRemoveGlobal] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});

  const { currentUser } = useAuth();
  const usersRef = doc(firestoreDB, "users", currentUser.uid);

  useEffect(() => {
    onSnapshot(usersRef, { includeMetadataChanges: true }, (doc) => {
      setContactsList((prevState) => {
        const temp = [...prevState, ...doc.data().contacts];
        return removeDuplicates(temp);
      });
    });
  }, []);

  const editContactHandler = (contact) => {
    setSelectedContact(contact);
    setEditContactVisibility(!editContactVisibility);
  };

  const handleDeletedItem = (id) => {
    setDeleteItemId(id);
    setDeleteConfirmationVisibility(true);
  };

  const postNewContact = async (data) => {
    try {
      getDoc(usersRef).then(async (res) => {
        const temp = res
          .data()
          .contacts.filter((contact) => contact.id !== data.id);
        temp.push(data);
        await updateDoc(usersRef, {
          contacts: temp,
        });
      });

      setAddContactVisibility(false);
    } catch (err) {
      alert(err);
    }
  };

  const deleteContact = async (id) => {
    try {
      let temp = [];
      getDoc(usersRef).then(async (res) => {
        temp = res.data().contacts.filter((contact) => contact.id !== id);
        await updateDoc(usersRef, {
          contacts: temp,
        });
      });
      setContactsList((prevState) => {
        const filter = [...prevState, ...temp].filter(
          (contact) => contact.id !== id
        );
        return removeDuplicates(filter);
      });
      setDeleteConfirmationVisibility(false);
    } catch (err) {
      alert(err);
    }
  };

  const updateContact = async (data, id) => {
    try {
      getDoc(usersRef).then(async (res) => {
        const temp = res.data().contacts.map((contact) => {
          if (contact.id === id) {
            return {
              ...data,
              id,
            };
          }
          return contact;
        });
        await updateDoc(usersRef, {
          contacts: temp,
        });
      });
      setEditContactVisibility(false);
    } catch (err) {
      alert(err);
    }
  };
  const loadGlobalContacts = async () => {
    const q = query(collection(firestoreDB, "contacts"));
    setPending(true);
    const querySnapshot = await getDocs(q);
    let temp = [];
    for (const item of querySnapshot.docs) {
      await runTransaction(firestoreDB, async (transaction) => {
        const sfDoc = await transaction.get(usersRef);
        temp = sfDoc
          .data()
          .contacts.filter((contact) => contact.id !== item.id);
        temp.push(item.data());
        transaction.update(usersRef, { contacts: temp });
        setGlobalContactsCount((prevState) => Number(prevState) + 1);
      });
    }
    setPending(false);
    setLoaded(true);
    setAddRemoveGlobal(!addRemoveGlobal);
  };
  return (
    <CRow className="bg-white p-4 rounded">
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
      <GlobalContactsModal
        setVisible={setGlobalContactsVisibility}
        visible={globalContactsVisibility}
        loadData={loadGlobalContacts}
        contactsCount={globalContactsCount}
        pending={pending}
        loaded={loaded}
        setContactsCount={setGlobalContactsCount}
      />
      <CRow>
        <CCol xs>
          <CRow className="mb-3 justify-content-end">
            <CCol className="justify-content-start d-flex" xs={7}>
              <h2 className="mb-0">Contacts List</h2>
            </CCol>
            <CCol className="justify-content-end d-flex" xs={3}>
              <CButton
                color="primary"
                className="text-white"
                style={{ width: "100%" }}
                onClick={() => {
                  setLoaded(false);
                  setGlobalContactsVisibility(!globalContactsVisibility);
                }}
              >
                Load global contacts
              </CButton>
            </CCol>
            <CCol className="justify-content-end d-flex" xs={2}>
              <CButton
                color="success"
                className="text-white"
                style={{ width: "100%" }}
                onClick={() => setAddContactVisibility(!addContactVisibility)}
              >
                Add new contact
              </CButton>
            </CCol>
          </CRow>
          <CRow className="w-100 m-0">
            {contactsList.length ? (
              <ContactsTable
                contacts={contactsList}
                editContactHandler={editContactHandler}
                handleDeletedItem={handleDeletedItem}
              />
            ) : (
              <NoContacts
                createContactModal={addContactVisibility}
                setCreateContactModal={setAddContactVisibility}
              />
            )}
          </CRow>
        </CCol>
      </CRow>
    </CRow>
  );
};

export default Contacts;

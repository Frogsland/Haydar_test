import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyAZ7MWHV_-8ltBCkuzqC63imJ6kQ2FL4Lc',
  authDomain: 'contacts-database-c5b26.firebaseapp.com',
  databaseURL: 'https://contacts-database-c5b26-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'contacts-database-c5b26',
  storageBucket: 'contacts-database-c5b26.appspot.com',
  messagingSenderId: '750533718520',
  appId: '1:750533718520:web:31eb8ee032a15f0ad7e60d',
}

const app = initializeApp(firebaseConfig)


export const firestoreDB = getFirestore(app)
export const auth = getAuth(app)

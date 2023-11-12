import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB-dZwsEgmx5pnLxiYIt4FupbB0LesucZU',
  authDomain: 'react-notes-14308.firebaseapp.com',
  projectId: 'react-notes-14308',
  storageBucket: 'react-notes-14308.appspot.com',
  messagingSenderId: '1073587880673',
  appId: '1:1073587880673:web:cc6324fc0b0bd602216da0',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const notesCollection = collection(db, 'notes');

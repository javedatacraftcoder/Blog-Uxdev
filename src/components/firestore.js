// src/firestore.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC5vO0FkNQUn4oQQMCLoTuj1sIuRYVen00",
  authDomain: "uxdevschoolblog.firebaseapp.com",
  projectId: "uxdevschoolblog",
  storageBucket: "uxdevschoolblog.appspot.com",
  messagingSenderId: "39087435178",
  appId: "1:39087435178:web:9ef887a17bdad4b9ac4fd3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);
const logOut = () => signOut(auth);

export { auth, db, signInWithGoogle, logOut, storage };

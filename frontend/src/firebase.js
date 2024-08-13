
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCJOVU4yJq46dfrGlKwAxRH5SUgdRLnCbE",
    authDomain: "practica443.firebaseapp.com",
    projectId: "practica443",
    storageBucket: "practica443.appspot.com",
    messagingSenderId: "150181797587",
    appId: "1:150181797587:web:9e651851cfa8c2f334fe26"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, deleteDoc, doc, onSnapshot };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDR6fDpoz9dDBNWhq2-qD-VVem0iqUK4Lo",
    authDomain: "music-3eefa.firebaseapp.com",
    projectId: "music-3eefa",
    storageBucket: "music-3eefa.firebasestorage.app",
    messagingSenderId: "141235836647",
    appId: "1:141235836647:web:e847e01b051ef90b43b442"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }
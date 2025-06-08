// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-XxsdO_PDkSebYX_h45W2R1We4LFMjqs",
    authDomain: "database-ari.firebaseapp.com",
    projectId: "database-ari",
    storageBucket: "database-ari.firebasestorage.app",
    messagingSenderId: "367734381976",
    appId: "1:367734381976:web:3882dfbb948be27c1a5fed",
    measurementId: "G-7J58M8E76B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
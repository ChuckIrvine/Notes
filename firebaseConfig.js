import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALP-cfc1cenpMbjO7-ai2yGC6_UuR_AS4",
  authDomain: "notes-1be4e.firebaseapp.com",
  projectId: "notes-1be4e",
  storageBucket: "notes-1be4e.firebasestorage.app",
  messagingSenderId: "878704222332",
  appId: "1:878704222332:web:03a770bd014415acac69f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
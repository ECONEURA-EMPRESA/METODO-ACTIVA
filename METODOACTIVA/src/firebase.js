import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// TODO: Replace with your actual Firebase project configuration
// You can get this from the Firebase Console > Project Settings > General
const firebaseConfig = {
    apiKey: "AIzaSyChFHAx5krCDs_5DrW7h58WqmuTuRuZs9Q",
    authDomain: "project-c465bc45-299b-470d-8b6.firebaseapp.com",
    projectId: "project-c465bc45-299b-470d-8b6",
    storageBucket: "project-c465bc45-299b-470d-8b6.firebasestorage.app",
    messagingSenderId: "476151355322",
    appId: "1:476151355322:web:5d180c698bc4fd09ef2f83"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Firebase configuration (Hardcoded for Guaranteed Connectivity v5.0)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const auth = getAuth(app);

// Export Gemini API Key for use in chat component
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 🛡️ APP CHECK (Security Foundation)
// Initialize App Check if the Site Key is present in environment.
if (import.meta.env.VITE_RECAPTCHA_SITE_KEY) {
    console.log("🛡️ Initializing Firebase App Check");
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true
    });
}


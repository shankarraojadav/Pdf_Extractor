import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VITE_REACT_APP_FIREBASE_API_KEY || import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,

  authDomain: process.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.VITE_REACT_APP_FIREBASE_PROJECT_ID || import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: process.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID || import.meta.env
    .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

  appId: process.env.VITE_REACT_APP_FIREBASE_APP_ID || import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,

  measurementId: process.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID || import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

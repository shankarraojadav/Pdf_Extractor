
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC6Z4GjUPf6o_35ghuO0AsWbOWFav1yDRo",
  authDomain: "pdfextractor-8e1aa.firebaseapp.com",
  projectId: "pdfextractor-8e1aa",
  storageBucket: "pdfextractor-8e1aa.appspot.com",
  messagingSenderId: "890727305915",
  appId: "1:890727305915:web:727b92ce609d3ccb254f9e",
  measurementId: "G-WKDNXP2PXL",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

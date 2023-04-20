import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const var_apiKey = import.meta.env.VITE_apiKey;
const var_authDomain = import.meta.env.VITE_authDomain;
const var_projectId = import.meta.env.VITE_projectId;
const var_storageBucket = import.meta.env.VITE_storageBucket;
const var_messagingSenderId = import.meta.env.VITE_messagingSenderId;
const var_appId = import.meta.env.VITE_appId;

const firebaseConfig = {
  apiKey: "AIzaSyDc4kFpbYNhhUdW0Ix7pxJ72mfDOldcpsc",
  authDomain: "portal-agro-familiar.firebaseapp.com",
  projectId: "portal-agro-familiar",
  storageBucket: "portal-agro-familiar.appspot.com",
  messagingSenderId: "232244633192",
  appId: "1:232244633192:web:cd01edbf86b871cec9a5dd",
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);

export const storage = getStorage(appFirebase);

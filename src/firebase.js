import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpWGwGlX9t34UoLlBQCFC3881RSx_oMjo",
  authDomain: "chat-app-8322b.firebaseapp.com",
  projectId: "chat-app-8322b",
  storageBucket: "chat-app-8322b.appspot.com",
  messagingSenderId: "494316838694",
  appId: "1:494316838694:web:1ed16124ab42714d832be7",
  measurementId: "G-TQC2CFNLWL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

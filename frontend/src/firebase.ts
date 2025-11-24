import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgUeshsTEsmpqzmydecSLhcapwMzzdhkk",
  authDomain: "cps714-section5-group7.firebaseapp.com",
  projectId: "cps714-section5-group7",
  storageBucket: "cps714-section5-group7.firebasestorage.app",
  messagingSenderId: "841367435720",
  appId: "1:841367435720:web:2725bcbe142cdd6332e8fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
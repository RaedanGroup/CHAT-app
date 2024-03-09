// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqoTc0kMhQ_bpVW7tzTUHFjtRX4TXFzqw",
  authDomain: "native-chat-14621.firebaseapp.com",
  projectId: "native-chat-14621",
  storageBucket: "native-chat-14621.appspot.com",
  messagingSenderId: "760514035256",
  appId: "1:760514035256:web:51f0aadae57cd2cfe970cd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

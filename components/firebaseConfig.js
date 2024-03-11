// ./components/firebaseConfig.js
// This file is used to initialize the Firebase app and export the db object to be used in other components.
// The db object is used to access the Firestore database.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { db, auth, storage };

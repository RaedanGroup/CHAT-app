// ./components/firebaseConfig.js

// This file is used to initialize the Firebase app and export the db, auth, and storage objects to be used in other components.

// The db object is used to access the Firestore database.

// The storage object is used to access the Firebase Storage service.

// The auth object is not used elsewhere in this project, but it is included in the export for any future use.
// It is used here to access the Firebase Authentication to maintain user authentication state between app restarts.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Update with your own Firebase config details for a new project
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

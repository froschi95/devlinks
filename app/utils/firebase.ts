import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAqX1qiL_j4qZO8Nf-B5jteWOuus_ql73M",
//   authDomain: "my-link-sharing-app.firebaseapp.com",
//   projectId: "my-link-sharing-app",
//   storageBucket: "my-link-sharing-app.appspot.com",
//   messagingSenderId: "501944544422",
//   appId: "1:501944544422:web:ffc41639d3ed3850c79867",
//   measurementId: "G-5PFKRGJVQ9",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export {
  db,
  auth,
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};

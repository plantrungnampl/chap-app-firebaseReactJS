import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfAVSr56_rGo6okx04j_QF6E1AQAEeK50",
  authDomain: "chat-online-ff260.firebaseapp.com",
  projectId: "chat-online-ff260",
  storageBucket: "chat-online-ff260.appspot.com",
  messagingSenderId: "718279849067",
  appId: "1:718279849067:web:f77541062657dcac4c2d2e",
  measurementId: "G-NRH1F98609",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

const db = getFirestore(app);
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
}

// const auth = Firebase.auth();
// const db = Firebase.firestore();
export { db, auth, app };

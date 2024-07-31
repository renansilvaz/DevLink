import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFSlWoU9H9K-D57PVWZL4AgpkxKTeyY9w",
  authDomain: "devlinks-83a20.firebaseapp.com",
  projectId: "devlinks-83a20",
  storageBucket: "devlinks-83a20.appspot.com",
  messagingSenderId: "754404038578",
  appId: "1:754404038578:web:9f8ab807b8d1dd9526f6ab",
  measurementId: "G-PX6SXS0GJX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
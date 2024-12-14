// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQXlKpCGMV2nuKU0f6M1QM-8FLQSR5JUA",
  authDomain: "blogapp-f8ee8.firebaseapp.com",
  projectId: "blogapp-f8ee8",
  storageBucket: "blogapp-f8ee8.firebasestorage.app",
  messagingSenderId: "408592815822",
  appId: "1:408592815822:web:485f065d01732092d8a29f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
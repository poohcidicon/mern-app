// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOL4Y8TmdJRgKG7tiOkmpsyZbB8gkHMt4",
    authDomain: "mern-app-29c06.firebaseapp.com",
    projectId: "mern-app-29c06",
    storageBucket: "mern-app-29c06.appspot.com",
    messagingSenderId: "664724832263",
    appId: "1:664724832263:web:a23515d32f35d0623beaa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export const provider = new GoogleAuthProvider()

export default app
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAbNMB5l2jfReNdZa0NyHMC_fhf-ZiM9H0",
  authDomain: "uploads-9bbc5.firebaseapp.com",
  projectId: "uploads-9bbc5",
  storageBucket: "uploads-9bbc5.appspot.com",
  messagingSenderId: "640199584043",
  appId: "1:640199584043:web:4a1c71f00129f767a77d6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;

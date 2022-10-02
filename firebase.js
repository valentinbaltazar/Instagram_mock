// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqzdGCVCFCKuf2FEtK9hHyHCqRoDk3MmM",
    authDomain: "instagram-16a36.firebaseapp.com",
    projectId: "instagram-16a36",
    storageBucket: "instagram-16a36.appspot.com",
    messagingSenderId: "373039011654",
    appId: "1:373039011654:web:06e02b535ed9a89622f747"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export { firebase, db }
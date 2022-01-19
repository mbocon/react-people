import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyByKIK6_xuAuzExy_JliMGRWf0ZqPd0pg4",
    authDomain: "react-firebase-projects-e66b1.firebaseapp.com",
    projectId: "react-firebase-projects-e66b1",
    storageBucket: "react-firebase-projects-e66b1.appspot.com",
    messagingSenderId: "858052419893",
    appId: "1:858052419893:web:7d85c2f627c918c5a8ac7c"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function login() {
    return auth.signInWithPopup(provider);
}

function logout() {
    return auth.signOut();
}

export {auth, login, logout};
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBBGdRp2cELxOBcMYAZSgyn5j6SH3wRfvg',
  authDomain: 'task-app-bd37e.firebaseapp.com',
  projectId: 'task-app-bd37e',
  storageBucket: 'task-app-bd37e.appspot.com',
  messagingSenderId: '665259209846',
  appId: '1:665259209846:web:872dd2738f8e0eba911b57',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBGnldfAYlQsWYOi2ILKhUf2OQ_D77JOxk',
  authDomain: 'baitportal-app.firebaseapp.com',
  projectId: 'baitportal-app',
  storageBucket: 'baitportal-app.appspot.com',
  messagingSenderId: '28988930045',
  appId: '1:28988930045:web:15a3f9019fbc8080748b94',
  measurementId: 'G-STQZ0DF202',
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

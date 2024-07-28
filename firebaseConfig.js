import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeCSeXYaca7mePdvhhxy5znt9yHo8RE8g",
  authDomain: "vi-sg-it.firebaseapp.com",
  projectId: "vi-sg-it",
  storageBucket: "vi-sg-it.appspot.com",
  messagingSenderId: "8194907932",
  appId: "1:8194907932:web:16e7ba67e7efc35604a4d9",
  measurementId: "G-KEJ470W6DX"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db, app };

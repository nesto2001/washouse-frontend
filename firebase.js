import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';

const config = {
    apiUrl: process.env.REACT_APP_FIREBASE_API_URL,
    apiKey: 'AIzaSyAdOuJj36Y0XknZ5IA999auoM4jJq4oUvU',
    authDomain: 'washouse-customer-8086f.firebaseapp.com',
    projectId: 'washouse-customer-8086f',
    storageBucket: 'washouse-customer-8086f.appspot.com',
    messagingSenderId: '982047497895',
    appId: '1:982047497895:web:87ec48185e395f8ba40582',
    measurementId: 'G-Z23Z9HH9NJ',
};
const app = initializeApp(config);
export const messaging = getMessaging(app);
export const db = getFirestore(app);


import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';

const config = {
    apiUrl: process.env.REACT_APP_FIREBASE_API_URL,
    apiKey: 'AIzaSyACbYJPELOu_VyC2jOPtP8KNFigZPGT9-4',
    authDomain: 'washouse-ebd95.firebaseapp.com',
    projectId: 'washouse-ebd95',
    storageBucket: 'washouse-ebd95.appspot.com',
    messagingSenderId: '767203330550',
    appId: '1:767203330550:web:f39c48fec2625f2c1b1fd7',
    measurementId: 'G-F43N59S48H',
};
const app = initializeApp(config);
export const messaging = getMessaging(app);
export const db = getFirestore(app);

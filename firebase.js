import * as firebase from 'firebase';

const config = {
    apiUrl: process.env.REACT_APP_FIREBASE_API_URL,
};
firebase.initializeApp(config);

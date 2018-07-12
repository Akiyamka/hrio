import firebase from '@firebase/app';
import '@firebase/firestore';

const config = {
  apiKey: 'AIzaSyAC26-2b1d6E9DEi4-WvviLjApTOW4oLXU',
  authDomain: 'hrio-001.firebaseapp.com',
  databaseURL: 'https://hrio-001.firebaseio.com',
  projectId: 'hrio-001',
  storageBucket: 'hrio-001.appspot.com',
  messagingSenderId: '226802517554',
};

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});

export { db };

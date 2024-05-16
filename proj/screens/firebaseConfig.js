import * as firebase from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBUeUPRtjhEopk9_m82TpafIrcv4HB4Px0',
  authDomain: 'dasource-80c67.firebaseapp.com',
  projectId: 'dasource-80c67',
  storageBucket: 'dasource-80c67.appspot.com',
  messagingSenderId: '158017338740',
  appId: '1:158017338740:android:aef0b88236405efe3b8021',
  databaseURL: 'https://dasource-80c67-default-rtdb.asia-southeast1.firebasedatabase.app'
};

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = app.auth();

export { auth };
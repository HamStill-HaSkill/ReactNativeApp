import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCOmFKHyh1_AY0IwTebUOjFXlAch53Gpxo',
  authDomain: 'amupart-294b9.firebaseapp.com',
  databaseURL: 'https://amupart-294b9-default-rtdb.firebaseio.com/',
  projectId: 'amupart-294b9',
  storageBucket: 'amupart-294b9.appspot.com',
  messagingSenderId: '729714487053',
  appId: '1:729714487053:android:b89851ae36069e42d18a44',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
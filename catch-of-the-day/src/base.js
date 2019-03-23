import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyCds0demvaOIjkGHs1XyCQg_CiDrZ1HcdM',
    authDomain: 'catch-of-the-day-amanda.firebaseapp.com',
    databaseURL: 'https://catch-of-the-day-amanda.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;

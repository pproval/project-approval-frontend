import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { firebaseInit } from './config';

firebase.initializeApp(firebaseInit);

const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const database = {
    users: firestore.collection('users'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
};
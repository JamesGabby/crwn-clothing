import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyD-E7n5PRwQNG9KWlurkWd4WK8r-VpgkDk",
    authDomain: "crwn-clothing-db-b41cc.firebaseapp.com",
    projectId: "crwn-clothing-db-b41cc",
    storageBucket: "crwn-clothing-db-b41cc.appspot.com",
    messagingSenderId: "877160938442",
    appId: "1:877160938442:web:21a9c315631b035a9eed33"
}

export const createuserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot =  await userRef.get()
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("Error creating user.", error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
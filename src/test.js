import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

console.log(firestore.collection('users').doc('DG20Z118ax2sy1QamhNt').collection('cartItems').doc('DG20Z118ax2sy1QamhNt'));
console.log(firestore.doc('/users/DG20Z118ax2sy1QamhNt/cartItems/DG20Z118ax2sy1QamhNt'));
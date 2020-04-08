import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAuEYqtocj0UkQVWI51JOrKDWRQ14pyF_w",
    authDomain: "milk-tea-server.firebaseapp.com",
    databaseURL: "https://milk-tea-server.firebaseio.com",
    projectId: "milk-tea-server",
    storageBucket: "milk-tea-server.appspot.com",
    messagingSenderId: "411845997720",
    appId: "1:411845997720:web:ec016cffafd317ca4d0ced",
    measurementId: "G-WKDTEDXL60"
}

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()

export default firestore

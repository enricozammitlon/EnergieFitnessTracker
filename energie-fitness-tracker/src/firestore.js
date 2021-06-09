import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDo2rvNuUqgoFYHp3XzmIh_RLK8jLoiq7Q",
    authDomain: "energie-fitness-tracker.firebaseapp.com",
    projectId: "energie-fitness-tracker",
    storageBucket: "energie-fitness-tracker.appspot.com",
    messagingSenderId: "1011872736963",
    appId: "1:1011872736963:web:4f1dad90946ccdc5022476"

 };
 firebase.initializeApp(config);
 export default firebase;
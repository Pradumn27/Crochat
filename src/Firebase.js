const firebaseConfig = {
    apiKey: "AIzaSyAezAcp8p00uITQP9HFKGpsstSjUjtdEm8",
    authDomain: "crochat-22721.firebaseapp.com",
    projectId: "crochat-22721",
    storageBucket: "crochat-22721.appspot.com",
    messagingSenderId: "257320885014",
    appId: "1:257320885014:web:5b65c8dbd17f9188c08e37"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
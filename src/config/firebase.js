import * as firebase from "firebase";

export const FirebaseConfig = {
    apiKey: "AIzaSyBl6-dye2yRKnvWZCrCa_Tc9CjmgoYAmxY",
    authDomain: "airvatadmin.firebaseapp.com",
    databaseURL: "https://airvatadmin.firebaseio.com"
  };

 var firebaseApp = firebase.initializeApp(FirebaseConfig);




export const todosRef=firebaseApp.database().ref("users");

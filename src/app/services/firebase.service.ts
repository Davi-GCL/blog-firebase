import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

import { getDatabase, ref, onValue, set } from "firebase/database";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  // Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: "AIzaSyBNselSlIxZRkBOc6j5nF53CELVTCAXWQE",
    authDomain: "angular-blog-d58d9.firebaseapp.com",
    databaseURL: "https://angular-blog-d58d9-default-rtdb.firebaseio.com",
    projectId: "angular-blog-d58d9",
    storageBucket: "angular-blog-d58d9.appspot.com",
    messagingSenderId: "777260546336",
    appId: "1:777260546336:web:661f58bd09d190c50cbf45"
  };

  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);

  analytics = getAnalytics(this.app);

  provider = new GoogleAuthProvider();
  auth = getAuth(this.app);

  userId:any;
  userName:any;
  userPhoto:any;

  async myloginWithGoogle(userNome:string):Promise<any> {
    let setUser = {}
  await  signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if(credential){
          const token = credential.accessToken;
        }else{ throw new Error("credential null")}
        // The signed-in user info.
        const user = result.user;
        this.userId = user.uid;
        this.userName = user.displayName;
        this.userPhoto = user.photoURL;
        userNome = user.displayName?user.displayName: '';
        console.log(user.displayName);

        return {
          nome: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        throw new Error(error)
      });
      
  }

  myLogout() {
  signOut(this.auth)
    .then(() => {
      // Sign-out successful.
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

sendToRealtimeDatabase() { }

activateUpdate(setState:any) {
  const db = getDatabase(this.app);
  const starCountRef = ref(db, '/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    
    const dataArray = Object.keys(data).map(key => data[key]);
    console.log(dataArray);
    setState(dataArray);

  });
}

writeUserData(texto:string) {
  const db = getDatabase(this.app);
  let aux = Date.now();
  set(ref(db, '/' + aux), {
    text: texto,
    user: this.userName,
    photo: this.userPhoto,
    time: Date.now()
  });
}
}

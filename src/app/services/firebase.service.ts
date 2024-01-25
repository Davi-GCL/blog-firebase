import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getFirestore, doc, setDoc, getDocs, addDoc, collection, updateDoc, serverTimestamp, query, orderBy, where, getDoc, deleteDoc, DocumentReference, WhereFilterOp,  onSnapshot, QuerySnapshot } from "firebase/firestore"

import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";


import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

import { IAuthor } from '../model/iauthor';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  // Your web app's Firebase configuration
  firebaseConfig = environment.firebaseConfig;

  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);

  analytics = getAnalytics(this.app);

  provider = new GoogleAuthProvider();
  auth = getAuth(this.app);

  firestoreDB = getFirestore(this.app);
  storage = getStorage()

  //Variaveis com dados do usuario:
  
  private _user: any = {
    userId: localStorage.getItem('userId')? localStorage.getItem('userId') : '',
    userName: localStorage.getItem('userName')? localStorage.getItem('userName') : '',
    userPhoto: localStorage.getItem('userPhoto')? localStorage.getItem('userPhoto') : ''
  }
  
  public get user() {
    return this._user;
  }

  public set user(value:IAuthor){
    this._user.userId = value.userId;
    this._user.userName = value.userName;
    this._user.userPhoto = value.userPhoto;

    localStorage.setItem('userId',value.userId);
    localStorage.setItem('userName',value.userName);
    localStorage.setItem('userPhoto',value.userPhoto);
  }
  
  //-----------------------------------------------------

  signUpEmail(email:any, password:any, name:any, photoURL?:string){
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const credential = userCredential.user;

      if(this.auth.currentUser){
        //Após a criação de um usuario com email e senha, atualiza o perfil de usuario adicionando um nome e uma foto
        updateProfile(userCredential.user, {
          displayName: name, photoURL: "https://firebasestorage.googleapis.com/v0/b/angular-blog-d58d9.appspot.com/o/images%2Fblank-profile-picture-973460_1280.jpg?alt=media&token=00439f5f-6a73-4b19-b711-5d0b4d0ea62b"
        }).then(()=>{
          this.user = {userId: credential.uid, userName: userCredential.user.displayName!, userPhoto:userCredential.user.photoURL!}
        })
      }
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  async signInEmail(email:any, password:any){
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const credential = userCredential.user;
      if(credential == null){throw new Error}
      this.user = {userId: credential.uid, userName: credential.displayName || '', userPhoto:credential.photoURL || ''}
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage)
    });
  }

  async myloginWithGoogle():Promise<any> {
    await signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if(credential){
          const token = credential.accessToken;
        }else{ throw new Error("credential null")}
        // The signed-in user info.

        const user = result.user;

        if(user.displayName == null || user.photoURL == null){throw new Error}

        this.user = {userId: user.uid, userName: user.displayName, userPhoto: user.photoURL}

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

  // sendToRealtimeDatabase() { }

  // activateUpdate(setState:any) {
  //   const db = getDatabase(this.app);
  //   const starCountRef = ref(db, '/');
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
      
  //     const dataArray = Object.keys(data).map(key => data[key]);
  //     console.log(dataArray);
  //     setState(dataArray);

  //   });
  // }

  // writeUserData(texto:string) {
  //   const db = getDatabase(this.app);
  //   let aux = Date.now();
  //   set(ref(db, '/' + aux), {
  //     text: texto,
  //     user: this.user.userName,
  //     photo: this.user.userPhoto,
  //     time: Date.now()
  //   });
  // }

//Metodos do Firestore database:

  getSnapshotDocuments(collectionName:string){
    const collectionRef = collection(this.firestoreDB, collectionName);

    const q = query(collectionRef, orderBy("datehour", "desc"));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docsContent:any[] = [];

        querySnapshot.forEach((doc) => {
          docsContent.push({...doc.data(), id: doc.id});
        });

        observer.next(docsContent);
      }, (error) => {
        observer.error(error);
      });

    });
  }

  async getDocuments(collectionName:string){
    const collectionRef = collection(this.firestoreDB, collectionName);

    // let docArray = await getDocs(collectionRef);

    //Faz uma consulta no banco de dados, ordenando os dados com base no campo datehour em ordem decrescente
    const q = query(collectionRef, orderBy("datehour", "desc"))
    let docArray = await getDocs(q);

    //Puxa e retorna os campos presentes nesse documento
    return docArray.docs.map((doc)=>({ ...doc.data(), id: doc.id}));
  }

  async getDocument(collectionName:string, docId:string){
    // const collectionRef = collection(this.firestoreDB, collectionName);
    
    return (await getDoc(doc(this.firestoreDB, collectionName, docId))).data();
  }

  async getDocumentsWhere(collectionPath:string, whereProperty:string, whereFilterOp:WhereFilterOp, whereValue:any):Promise<any>
  {
    const collectionRef = collection(this.firestoreDB, collectionPath);

    let q = query(collectionRef, where(whereProperty, whereFilterOp, whereValue));

    return await getDocs(q);
  }

  async createDocument(collectionName:string, data:any): Promise<DocumentReference>{
    //Cria um documento (registro/linha) na coleção(tabela) informada
    const docRef = await addDoc(collection(this.firestoreDB, collectionName), data);
    
    console.log("Document written with ID: ", docRef.id);

    return docRef;
  }

  async updateDocument(collectionName:string , docName:string, updateObj:any){
    const docRef = doc(this.firestoreDB, collectionName, docName);

    //Atualiza apenas os campos passados
    // return await updateDoc(docRef, {...updateObj , datehour: serverTimestamp()});
    return await updateDoc(docRef, {...updateObj});
  }

  async deleteDocument(collectionName:string, docName:string){
    return await deleteDoc(doc(this.firestoreDB, collectionName, docName));
  }


//Metodos do Firebase Storage: 

  async uploadToStorage(path:string ,file:File){
    //Concatena o nome do arquivo com os milisegundos atuais para que o nome nunca seja repetido
    let fileName = file.name + Date.now().toString();
    path = path + '/' + fileName;
    const imagesRef = storageRef(this.storage, path);

    // 'file' comes from the Blob or File API
    // uploadBytes(imagesRef, file).then((snapshot) => {
    //   console.log(snapshot.metadata.fullPath);
    // });
    
    const upload = await uploadBytes(imagesRef, file);
    // return upload.ref.fullPath;

    return await getDownloadURL(imagesRef);
    

  }
  
}

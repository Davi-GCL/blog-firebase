import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FirebaseService } from './services/firebase.service';
import { Timestamp } from 'firebase/firestore';

import { Post } from './model/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blog-firebase';
  postID = "";
  userId:string | null = null;
  
  constructor(public firebase: FirebaseService){}
  ngOnInit(): void {
      this.getPosts()
      this.userId = localStorage.getItem('userName');
  }

  getPosts(){
    this.firebase.getDocuments("Posts").then((res)=>{console.log(res)})
  }

  
  updatePost(){
    this.firebase.updateDocument("Posts",this.postID,{content:"A lição do rato",likes:100})
  }


  getComents(postId:string){
    console.log("Comentarios do post:"+ postId)
    this.firebase.getDocuments(`Posts/${postId}/coments`).then((res)=>{console.log(res)})
  }

  async loginGoogle(){
    try {
      await this.firebase.myloginWithGoogle().then(res => this.userId = this.firebase.user.userId);
      // console.log("seu nome: "+ this.firebase.userName);
    } catch (error) {
      console.log(error)
    }
  }

  async logoutGoogle(){
    await this.firebase.myLogout();
    localStorage.clear();
  }

  formRegister = new FormGroup({
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('',[Validators.required]),

  })

  onLogin:boolean = true;

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])
  })

  // get email(){
  //   return this.formRegister.controls.email? this.formRegister.controls.email : "";
  // }

  registerEmail(){
    if(this.formRegister.controls.email.valid && this.formRegister.controls.senha.valid){
      this.firebase.signUpEmail(this.formRegister.controls.email.value, this.formRegister.controls.senha.value)
      console.log("Registrado", this.formRegister.controls.email , this.formRegister.controls.senha)
    }else{
      throw new Error("erro no registro")
    }
  }

  loginEmail(){
    if(this.formLogin.controls.email.valid && this.formLogin.controls.senha.valid){
      this.firebase.signInEmail(this.formLogin.controls.email.value, this.formLogin.controls.senha.value);
    }else{
      throw new Error("erro no login")
    }

  }
}

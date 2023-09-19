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
  
  constructor(public firebase: FirebaseService){
    
  }
  ngOnInit(): void {
      // this.getPosts()
      this.userId = localStorage.getItem('userId');
  }

  // getPosts(){
  //   this.firebase.getDocuments("Posts").then((res)=>{console.log(res)})
  // }

  
  // updatePost(){
  //   this.firebase.updateDocument("Posts",this.postID,{content:"A lição do rato",likes:100})
  // }


  // getComents(postId:string){
  //   console.log("Comentarios do post:"+ postId)
  //   this.firebase.getDocuments(`Posts/${postId}/coments`).then((res)=>{console.log(res)})
  // }

}

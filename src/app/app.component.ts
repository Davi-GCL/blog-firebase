import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  
  constructor(public firebase: FirebaseService){}
  ngOnInit(): void {
      this.getPosts()
      this.getComents("4iKpobmQ1a9Dpp8bmFQb")
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

}

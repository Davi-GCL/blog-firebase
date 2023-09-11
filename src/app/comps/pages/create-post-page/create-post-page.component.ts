import { Component, OnInit } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent {
  postID = "";
  
  constructor(public firebase: FirebaseService){}

  getPosts(){
    this.firebase.getDocuments("Posts").then((res)=>{console.log(res)})
  }

  
  updatePost(){
    this.firebase.updateDocument("Posts",this.postID,{content:"A lição do rato",likes:100})
  }

}

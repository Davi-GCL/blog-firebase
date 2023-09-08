import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { FirebaseService } from './services/firebase.service';
import { Timestamp } from 'firebase/firestore';

import { Post } from './model/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-firebase';
  postID = "BXyPfvQmfGoI3zBn7AE7";
  
  constructor(public firebase: FirebaseService){
    this.getPosts()
  }

  getPosts(){
    this.firebase.getDocuments("Posts").then((res)=>{console.log(res)})
  }
  createPost(){
    let newPost:Post = {
      title:'',
      text:'',
      thumbnailUrl:'',
      bannerUrl:'',
      author: {userId:'',userName:'',userPhoto:''},
      likes: 0
    }
    
    this.firebase.createDocument("Posts",{title:"Quarto Post",content:"conteudo", author:"LeroGenerator", datehour: Timestamp.fromDate(new Date()), likes: 10})
  }
  updatePost(){
    this.firebase.updateDocument("Posts",this.postID,{content:"A lição do rato",likes:100})
  }


}

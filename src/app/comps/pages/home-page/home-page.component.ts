import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  postList!: Array<Post>;

  constructor(private firebase: FirebaseService , private postShare:PostService , private router: Router){}

  ngOnInit(): void {
      this.getPosts()

  }

  getPosts(){
    this.firebase.getDocuments("Posts").then((res)=>{console.log(res); this.postList = <Array<Post>>res})
  }

  buildPreview(array:Array<string>):string{
    return array.reduce((pre:string,current:string)=>pre+' '+current)
  }

  openPost(postId:any){
    let post = this.postList.find((p)=>p.id==postId);
    if(post){
      this.postShare.setSharedPost(post);
      this.router.navigate(['/post',postId]);
    }else{
      throw new Error('Post não encontrado')
    }
  }
}

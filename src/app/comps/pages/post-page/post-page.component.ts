import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

import { Comment as MyComment } from 'src/app/model/comment';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit{
  id:string | null = '';
  post:any;
  commentsList: Array<MyComment> = new Array<MyComment>();

  formComment: FormGroup = new FormGroup({
    inputComment: new FormControl('', [Validators.required])
  })

  get commentary(){
    return this.formComment.controls['inputComment'].value;
  }

  constructor(private route: ActivatedRoute, private postShared: PostService , private firebase: FirebaseService , public router: Router){}

  isSigned(){
    return this.firebase.user.userId?true:false;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id){
      this.getPost(this.id);
      this.getComments();
    }
  }

  getPost(postId:string){
    // this.post = this.postShared.getSharedPost();
    //Transforma o timestamp do formato firestore(presente no atributo datehour) para o datetime no formato string entendivel
    this.firebase.getDocument('Posts', postId).then((res)=>{if(res){this.post = {...res , datehour: new Date(res['datehour']['seconds']*1000).toLocaleString()}}});
  }

  uploadComment(){
    let newComment = new MyComment(this.firebase.user, this.commentary, new Date())

    this.firebase.createDocument(`Posts/${this.id}/coments`,{...newComment})
    this.router.navigate([this.router.url]);
  }

  getComments(){
    this.firebase.getDocuments(`Posts/${this.id}/coments`).then((res)=>{
      let aux = res as Array<MyComment>;
      //Transforma o timestamp do formato firestore(presente no atributo datehour) para o datetime no formato string entendivel
      this.commentsList = aux.map((c:any)=>{return {...c, datehour:new Date(c['datehour']['seconds']*1000).toLocaleString()}});
      
      console.log(this.commentsList)
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

import { Comment as MyComment } from 'src/app/model/comment';
import { AlertService } from 'src/app/services/alert.service';
 
import { RatingService } from 'src/app/services/rating.service';
import { IAuthor } from 'src/app/model/iauthor';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit{
  id:string | null = '';
  post:any;
  commentsList: Array<MyComment> = new Array<MyComment>();
  user!:IAuthor;

  formComment: FormGroup = new FormGroup({
    inputComment: new FormControl('', [Validators.required])
  })

  get commentary(){
    return this.formComment.controls['inputComment'].value;
  }

  constructor(private route: ActivatedRoute, public postService: PostService, public rateService: RatingService , private firebase: FirebaseService , public router: Router , public alertService: AlertService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id){
      this.getPost(this.id);
      
      this.rateService.getComments(this.id).then((result)=>this.commentsList = result);
    }

    this.firebase.user$.subscribe((value)=>{
      this.user = value;
    })
  }

  getPost(postId:string){
    // this.post = this.postShared.getSharedPost();
    //Transforma o timestamp do formato firestore(presente no atributo datehour) para o datetime no formato string entendivel
    this.firebase.getDocument('Posts', postId).then((res)=>{if(res){this.post = {...res , datehour: new Date(res['datehour']['seconds']*1000).toLocaleString()}}});
  }

  uploadComment()
  {
    if(!this.id) throw new Error("Nao foi possivel acessar o id do post para comentar");

    this.rateService.uploadComment(this.id, this.commentary).then((result)=>this.commentsList = result);
  }

  toEditPost(){
    this.router.navigate(['/edit-post',this.id]);
  }

  deletePost(){
    if(window.confirm("Você tem certeza que deseja deletar?")){
      if(this.id){
        this.firebase.deleteDocument("Posts",this.id);
      }else{
        throw new Date("Não foi possivel pegar o id");
      }
      this.router.navigate(['/'])
      this.alertService.add("Post deletado com sucesso!",`Post deletado: ${this.post.title}`)
    }
  }

  isSigned(){
    return this.user.userId?true:false;
  }

  isAuthor(){
    return this.post.author.userId == this.user.userId;
  }
}

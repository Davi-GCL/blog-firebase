import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormCreatePostComponent } from '../../form-create-post/form-create-post.component';
import { IAuthor } from 'src/app/model/iauthor';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, AfterViewChecked {

  @ViewChild(FormCreatePostComponent) formComp!: FormCreatePostComponent;

  postID:any = "";
  post!:Post;  
  formPost!: FormGroup;
  user!:IAuthor

  constructor(public firebase: FirebaseService , public router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.firebase.user$.subscribe((value)=>{
      this.user = value;
    })

    this.postID = this.route.snapshot.paramMap.get('id')
    if(!this.postID){
      throw new Error('Erro ao buscar o id na url')
    }

    this.getPost(this.postID).then((res)=>{
      this.post = res;
      this.authorize();
      
      this.formComp.formPost.controls['title'].setValue(res.title);
      this.formComp.formPost.controls['text'].setValue(res.text);
      this.formComp.formPost.controls['tag'].setValue(res.tag);
      this.formComp.bannerURL = res.bannerUrl;
      this.formComp.thumbnailURL = res.thumbnailUrl;
    }).catch((err)=>{
      alert(err)
    });

  }

  ngAfterViewChecked(): void {
  // viewChild is updated after the view has been checked

  }

  async getPost(postId:string){
    // this.post = this.postShared.getSharedPost();
    //Transforma o timestamp do formato firestore(presente no atributo datehour) para o datetime no formato string entendivel
    let res = await this.firebase.getDocument('Posts', postId);

    if(res){
      return {...res , datehour: new Date(res['datehour']['seconds']*1000).toLocaleString()} as Post
    }
    else{
      throw new Error("Erro ao buscar o post")
    }
  }
  
  updatePost(){
    this.firebase.updateDocument("Posts",this.postID,{
      title: this.formComp.formPost.controls['title'].value, 
      content: this.formComp.formPost.controls['text'].value, 
      tag: this.formComp.formPost.controls['tag'].value
    })
  }

  authorize(){
    if(this.post.author.userId != this.user.userId){
      alert("Só o autor do post pode editá-lo")
      this.router.navigate(['/post',this.postID]);
    }
  }
}

import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Comment as MyComment } from 'src/app/model/comment';
import { IAuthor } from '../model/iauthor';


@Injectable({
  providedIn: 'root'
})
export class RatingService implements OnInit{

  public user!: IAuthor;

  constructor(private firebase:FirebaseService) 
  {
    this.firebase.user$.subscribe((value) => { this.user = value ; console.log("Usuario reconhecido em rating service")})
  }

  ngOnInit(): void {
      
  }

  async getComments(postId:string): Promise<MyComment[]>{
    let res = await this.firebase.getDocuments(`Posts/${postId}/coments`);
    
    let commentsList = res as Array<MyComment>;
    
    //Transforma o timestamp do formato firestore(presente no atributo datehour) para o datetime no formato string entendivel
    commentsList = commentsList.map((c:any)=>{return {...c, datehour:new Date(c['datehour']['seconds']*1000).toLocaleString()}});
      
    // console.log(commentsList);
    return commentsList;
    
  }

  async uploadComment(postId:string, commentary:any){
    let newComment = new MyComment(this.user, commentary, new Date())

    await this.firebase.createDocument(`Posts/${postId}/coments`,{...newComment});
    
    return await this.getComments(postId);

    // this.router.navigate([this.router.url]);

  }
 
  updatePostLikes(postId:string, currentLikes:Array<string>):boolean{

    let userId = this.user.userId;

    if(!userId) throw new Error("ID de usuario nulo!")

    let userLikeIndex:number = currentLikes.findIndex(x=>x === userId)

    if(userLikeIndex != -1){
    //Removendo o usuario da lista de likes
      let updatedLikesList = currentLikes.filter((value:string, i:number) => i != userLikeIndex);

      console.log("likesList: ",updatedLikesList);

      this.firebase.updateDocument(`Posts/`,postId, {likes: updatedLikesList});

      return false;
    }
    else{
      //Adicionando o usuario na lista de likes
      let updatedLikesList = [...currentLikes, userId];

      this.firebase.updateDocument(`Posts/`,postId, {likes: updatedLikesList});

      return true;
    }
  }

  updateCommentLikes(postId:string, commentId:string, currentLikes:Array<string>):boolean{

    let userId = this.user.userId;

    let userLikeIndex:number = currentLikes.findIndex(x=>x === userId)

    if(userLikeIndex != -1){
      //Removendo o usuario da lista de likes
      let updatedLikesList = currentLikes.filter((value:string, i:number) => i != userLikeIndex);

      this.firebase.updateDocument(`Posts/${postId}/comments`, commentId, {likes: updatedLikesList});

      return false;
    }
    else{
      //Adicionando o usuario na lista de likes
      let updatedLikesList = [...currentLikes, userId];

      this.firebase.updateDocument(`Posts/${postId}/comments`, commentId, {likes: updatedLikesList});
      
      return true;
    }
    
    // this.firebase.createDocument(`Posts/${postId}/comments/${commentId}/likes`, new Like(userId));
  }
}

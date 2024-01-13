import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Comment as MyComment } from 'src/app/model/comment';
import { Like } from '../model/like';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private firebase:FirebaseService) { }

  async getComments(postId:string): Promise<MyComment[]>{
    let res = await this.firebase.getDocuments(`Posts/${postId}/coments`);
    
    let commentsList = res as Array<MyComment>;
    
    //Transforma o timestamp do formato firestore(presente no atributo datehour) para o datetime no formato string entendivel
    commentsList = commentsList.map((c:any)=>{return {...c, datehour:new Date(c['datehour']['seconds']*1000).toLocaleString()}});
      
    // console.log(commentsList);
    return commentsList;
    
  }

  async uploadComment(postId:string, commentary:any){
    let newComment = new MyComment(this.firebase.user, commentary, new Date())

    await this.firebase.createDocument(`Posts/${postId}/coments`,{...newComment});
    
    return await this.getComments(postId);

    // this.router.navigate([this.router.url]);

  }
 
  updatePostLikes(postId:string, currentLikes:Array<string>){

    let userId = this.firebase.user.userId;

    let userLikeIndex:number = currentLikes.findIndex(x=>x === userId)

    if(userLikeIndex != -1){
      this.firebase.updateDocument(`Posts/`,postId, currentLikes.map((v:string, i:number) => i != userLikeIndex));
    }
    else{
      this.firebase.updateDocument(`Posts/`,postId, currentLikes.push(userId));
    }

  }

  updateCommentLikes(postId:string, commentId:string, currentLikes:any, userId:string, event:any){
    console.log(event.target.classList);
    
    let updtLikes:number = parseInt(currentLikes) + 1;
    
    this.firebase.createDocument(`Posts/${postId}/comments/${commentId}/likes`, new Like(userId));
    this.firebase.updateDocument(`Posts/${postId}/comments`,commentId, {likes: updtLikes});
  }
}

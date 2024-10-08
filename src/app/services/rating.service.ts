import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Comment as MyComment } from 'src/app/model/comment';
import { IAuthor } from '../model/iauthor';
import { Author } from '../model/author';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  public user!: IAuthor;

  private readonly _commentsPath = "Posts/{postId}/coments";

  constructor(private firebase:FirebaseService, private alertService: AlertService) 
  {
    this.firebase.user$.subscribe((value) => { this.user = value ; console.log("Usuario reconhecido em rating service")})
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

  async updateCommentContent(postId:string, commentId:string, newContent:string){
    let userId = this.user.userId;

    if(commentId == "") throw new Error("Nao foi possivel achar o id do comentario!")
    if(newContent == "") throw new Error("Conteudo de comentario invalido!")
      
    return await this.firebase.updateDocument(`Posts/${postId}/coments/`, commentId, {text: newContent});

  }

  updateCommentLikes(postId:string, commentId:string, currentLikes:Array<string>):boolean{

    let userId = this.user.userId;

    let userLikeIndex:number = currentLikes.findIndex(x=>x === userId)

    if(userLikeIndex != -1){
      //Removendo o usuario da lista de likes
      let updatedLikesList = currentLikes.filter((value:string, i:number) => i != userLikeIndex);

      this.firebase.updateDocument(`Posts/${postId}/coments`, commentId, {likes: updatedLikesList});

      return false;
    }
    else{
      //Adicionando o usuario na lista de likes
      let updatedLikesList = [...currentLikes, userId];

      this.firebase.updateDocument(`Posts/${postId}/coments`, commentId, {likes: updatedLikesList});
      
      return true;
    }
    
    // this.firebase.createDocument(`Posts/${postId}/comments/${commentId}/likes`, new Like(userId));
  }

  async deleteCommentAsync(postId: string, commentId:string, commentAuthor: IAuthor) : Promise<any>
  {
    let isAuthor = this.firebase.userInfoEquals(commentAuthor.userId);

    if(!isAuthor){
      this.alertService.add("Ação não autorizada", "Somente o autor do post ou do comentário podem deletar o comentário!", "danger");
      throw new Error("Somente o autor pode deletar o comentario");
    }

    let commentCollection = this._commentsPath.replace("{postId}", postId);

    let foundComment = await this.firebase.getDocument(commentCollection, commentId);

    if(!foundComment){
      this.alertService.add("", "Comentário não encontrado", "danger");
      throw new Error("Comentário não encontrado");
    }

    return this.firebase.deleteDocument(commentCollection, commentId);
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
}

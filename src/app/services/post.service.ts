import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private sharedPost!: Post;
  public postList!: Array<Post>;
  public trendPostsList!: Array<Post>;
  
  constructor(private firebase: FirebaseService, private router: Router) { }

  async getPosts(){
    let res = await this.firebase.getDocuments("Posts")
    let postsArray = res as Array<Post>;
      
    //Transforma o timestamp do formato firestore(presente no atributo datehour) para o datetime no formato string entendivel
    postsArray = postsArray.map((p:any)=>{return {...p, datehour:new Date(p['datehour']['seconds']*1000).toLocaleString()}});

    this.postList = postsArray;
    // console.log(this.postList)
    return postsArray;
  }

  sortPosts(){
    if(!this.postList)
    {
      throw new Error("Lista de postagens indefinida!")
    }
    this.trendPostsList = [...this.postList]
    this.trendPostsList.sort(this.sortByLikes) //O metodo array.sort modifica o proprio array passado e retorna um ponteiro de referencia para esse array
  }

  openPost(postId:any, router?:Router){
    let post = this.postList.find((p)=>p.id==postId);
    if(post){
      this.setSharedPost(post);
      this.router.navigate(['/post',postId]);
    }else{
      throw new Error('Post não encontrado')
    }
  }

  updateLikes(event:any, postId:string|undefined, currentLikes:any){
    // event.target
    let likes:number = parseInt(currentLikes) + 1;
    
    if(!postId)
    {
      throw new Error("ID do post indefinido")
    }
    
    this.firebase.updateDocument(`Posts`,postId, {likes:likes})
  }

  sortByLikes(a: Post, b: Post): number {
    // this is the typical structure of a custom sort function in plain JavaScript

    if (a.likes.length > b.likes.length) { return -1; }
    if (a.likes.length === b.likes.length) { return 0; }
    if (a.likes.length < b.likes.length) { return 1; }
    throw new Error("Impossivel ordenar a lista de posts por likes")
  }

  setSharedPost(data: Post) {
    this.sharedPost = data;
  }

  getSharedPost(): Post {
    return this.sharedPost;
  }

}

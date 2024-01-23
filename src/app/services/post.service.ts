import { Injectable, OnDestroy } from '@angular/core';
import { Post } from '../model/post';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnDestroy{

  private sharedPost!: Post;
  public postList!: Array<Post>;
  public trendPostsList!: Array<Post>;
  public postSubscriptions!: Subscription;
  
  constructor(private firebase: FirebaseService, private router: Router) { }

  mapPosts(datas:any[]){
    let postsArray:Array<Post> = new Array<Post>();

    datas.forEach((data)=>{
      let postDTO:Post = {
        id: data.id.toString(),
        title: data.title,
        text: data.text,
        thumbnailUrl: data.thumbnailUrl,
        bannerUrl: data.bannerUrl,
        author: {...data.author},
        likes: data.likes,
        datehour: new Date(data['datehour']['seconds']*1000).toLocaleString()
      } 
      postsArray.push(postDTO)
    })

    return postsArray;
  }

  async getPosts(){
    
    this.postSubscriptions = this.firebase.getSnapshotDocuments("Posts").subscribe(
      {
        next: (result) => {
          this.postList = this.mapPosts(result);
          console.log(result);
        },
        error: (err)=>console.log(err)
      }
    )

    return this.postSubscriptions;
    
    // let postsArray = res.map((value)=>{
    //   return new Post().assign(value);
    // })

    // let postsArray = res as Array<Post>;
      
    // //Transforma o timestamp do formato firestore(presente no atributo datehour) para o datetime no formato string entendivel
    // postsArray = postsArray.map((p:any)=>{return {...p, datehour:new Date(p['datehour']['seconds']*1000).toLocaleString()}});

    // this.postList = postsArray;
    // // console.log(this.postList)
    // return postsArray;
  }

  sortPosts(){
    if(!this.postList)
    {
      throw new Error("Lista de postagens indefinida!")
    }
    this.trendPostsList = [...this.postList]
    this.trendPostsList.sort(this.sortByLikes) //O metodo array.sort modifica o proprio array passado e retorna um ponteiro de referencia para esse array
  }

  sortByLikes(a: Post, b: Post): number {
    // this is the typical structure of a custom sort function in plain JavaScript

    if (a.likes.length > b.likes.length) { return -1; }
    if (a.likes.length === b.likes.length) { return 0; }
    if (a.likes.length < b.likes.length) { return 1; }
    throw new Error("Impossivel ordenar a lista de posts por likes")
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

  setSharedPost(data: Post) {
    this.sharedPost = data;
  }

  getSharedPost(): Post {
    return this.sharedPost;
  }

  ngOnDestroy(): void {
      this.postSubscriptions.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  postList!: Array<Post>;
  trendPostsList!: Array<Post>;
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  get search(){
    if(this.searchForm.controls.search.value){
      return this.searchForm.controls.search.value;
    }
    return '';
  }

  constructor(private firebase: FirebaseService , private postShare:PostService , private router: Router){}

  ngOnInit(): void {
      this.getPosts()
  }

  getPosts(){
    this.firebase.getDocuments("Posts").then((res)=>{
      //Transforma o timestamp do formato firestore(presente no atributo datehour) para o datetime no formato string entendivel
      let aux = res as Array<Post>;
      this.postList = aux.map((p:any)=>{return {...p, datehour:new Date(p['datehour']['seconds']*1000).toLocaleString()}});
      this.trendPostsList = this.postList.sort(this.sortByLikes)
      console.log(this.postList)})
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

  updateLikes(event:any, postId:string, currentLikes:any){
    // event.target
    let aux:number = parseInt(currentLikes) + 1
    this.firebase.updateDocument(`Posts`,postId, {likes:aux})
  }

  addTagSearch(event:any){
    this.searchForm.controls.search.setValue("tag:"+event.target.innerText)
  }

  sortByLikes(a: Post, b: Post): number {
    // this is the typical structure of a custom sort function in plain JavaScript

    if (a.likes > b.likes) { return -1; }
    if (a.likes === b.likes) { return 0; }
    if (a.likes < b.likes) { return 1; }
    throw new Error("Impossivel ordenar a lista de posts por likes")
  }
}

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

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  get search(){
    if(this.searchForm.controls.search.value){
      return this.searchForm.controls.search.value;
    }
    return '';
  }

  constructor(public postService:PostService , private router: Router){}

  ngOnInit(): void {
    this.postService.getPosts().then((res)=>this.postService.sortPosts());
  }


  buildPreview(array:Array<string>):string{
    return array.reduce((pre:string,current:string)=>pre+' '+current)
  }

  addTagSearch(event:any){
    this.searchForm.controls.search.setValue("tag:"+event.target.innerText)
  }
}

import { Component, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-aside-content',
  templateUrl: './aside-content.component.html',
  styleUrls: ['./aside-content.component.css']
})
export class AsideContentComponent {

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(public postService:PostService){}

  addTagSearch(event:any){
    this.searchForm.controls.search.setValue("tag:"+event.target.innerText)
  }
}

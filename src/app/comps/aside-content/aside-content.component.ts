import { Component, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
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

  constructor(public postService:PostService, private firebaseService:FirebaseService){}

  toggleStatusFilter(event:any){
    let statusFilter:boolean = !event.target.checked;

    this.firebaseService.getSnapshotDocuments("Posts", ['isVerified', statusFilter]);
  }

  addTagSearch(event:any){
    this.searchForm.controls.search.setValue("tag:"+event.target.innerText)
  }
}

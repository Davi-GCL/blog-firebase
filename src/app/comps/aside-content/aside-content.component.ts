import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryFilter } from 'src/app/model/queryFilter';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-aside-content',
  templateUrl: './aside-content.component.html',
  styleUrls: ['./aside-content.component.css']
})
export class AsideContentComponent implements OnInit{

  searchForm = new FormGroup({
    search: new FormControl(''),
    checkVerifiedFilter: new FormControl()
  });

  constructor(public postService:PostService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.searchForm.controls.checkVerifiedFilter?.setValue((params["unverified"]=="true"? true : false));
    })

    this.searchForm.controls.checkVerifiedFilter?.valueChanges.subscribe((newValue)=>{
      this.router.navigate(['./'], { queryParams: { unverified: newValue }, queryParamsHandling: "merge" });
    })
  }

  addTagSearch(event:any){
    this.searchForm.controls.search.setValue("tag:" + event.target.innerText)
  }
}

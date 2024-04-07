import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/model/post';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { FormControl, FormGroup } from '@angular/forms';
import { tap, map, Observable, switchMap } from 'rxjs';
import { AsideContentComponent } from '../../aside-content/aside-content.component';
import { QueryFilter } from 'src/app/model/queryFilter';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy{

  @ViewChild('asideContentLG', {static:false}) asideContentLG!: AsideContentComponent;
  @ViewChild('asideContentSM', {static:false}) asideContentSM!: AsideContentComponent;

  // Variaveis de paginacao
  currentPage: number = 1;
  isVerified: boolean = true;

  get search(){
    if(this.asideContentLG.searchForm.controls.search.value){
      return this.asideContentLG.searchForm.controls.search.value;
    }
    if(this.asideContentSM.searchForm.controls.search.value){
      return this.asideContentSM.searchForm.controls.search.value;
    }
    return '';
  }

  constructor(public postService:PostService , private router: Router, private route: ActivatedRoute)
  {
    // this.activatedRoute.queryParams.subscribe((result)=>{
    //   this.searchParam = result['tag']
    // })

  }

  ngOnInit(): void {
    this.getQueryParams()

    this.postService.postSubscriptions = this.postService.getPostsObservable(new QueryFilter("isVerified", this.isVerified))
    .pipe(map(this.postService.mapPosts))
    .subscribe(
        {
          next: (result) => {
            this.postService.postList = result;

            this.postService.listTrendPostsByLikes(this.postService.postList);
            
            console.log(this.postService.trendPostsList);
          },
          error: (err)=>console.log(err)
        }
      );
  }

  ngOnDestroy(): void {
      this.postService.postSubscriptions.unsubscribe();
  }

  getQueryParams(): void{
      this.route.queryParams.subscribe((params)=>{
        this.currentPage = params["page"]? params["page"] : this.currentPage;
        this.isVerified = params["isverified"]? params["isverified"] : this.isVerified;
        console.log("Page:", params["page"])
        console.log("Verificado:", params["isverified"])
      })
  }

  buildDetailsPreview(array:Array<string>):string{
    return array.reduce((pre:string,current:string)=>pre+' '+current)
  }

}

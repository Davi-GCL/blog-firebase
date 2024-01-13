import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input("postContent") post!: Post; 

  constructor(public postService:PostService, public ratingService: RatingService, public router:Router){}

  handleLike(event:any)
  {
    if(!this.post.id) throw new Error("ID do Post encontra-se indefinido");

    console.log(event.target.classList);

    this.ratingService.updatePostLikes(this.post.id, this.post.likes);
  }
}

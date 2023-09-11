import { Injectable } from '@angular/core';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  private sharedPost!: Post;

  setSharedPost(data: Post) {
    this.sharedPost = data;
  }

  getSharedPost(): Post {
    return this.sharedPost;
  }

}

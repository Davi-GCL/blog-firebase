import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit{
  
  private readonly userId!:string;
  
  isLiked!:boolean;

  @Input()
  postId!:string | undefined

  @Input()
  postLikes!:Array<string>;

  constructor(public ratingService: RatingService, private firebaseService: FirebaseService, public alertService:AlertService)
  {
    this.userId = this.firebaseService.user.userId;
  }

  ngOnInit(): void {
    
    this.isLiked = this.verifyThisUserLike();
  }

  verifyThisUserLike():boolean{
    if(!this.userId) throw new Error("ID do usuario não encontrado")

    if(this.postLikes.includes(this.userId))
    {
      return true;
    }
    return false;
  }

  handleLike(event:any)
  {
    if(!this.postId) throw new Error("ID do Post encontra-se indefinido");

    if(!this.userId)
    {
      this.alertService.add("Você precisa estar cadastrado para avaliar!");
      
      throw new Error("É necessario estar cadastrado para avaliar!");
    }

    console.log(event.target.classList);

    this.isLiked = this.ratingService.updatePostLikes(this.postId, this.postLikes);
  }

}

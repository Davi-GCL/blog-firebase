import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/model/comment';
import { EventDTO } from 'src/app/model/eventDTO';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input() commentData!:Comment;
  @Output() onUpdate = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private ratingService: RatingService) {}

  deleteComment() : any
  {
    let postId = this.route.snapshot.paramMap.get('id');
    
    if(postId == null)
      throw new Error("ID do post nao encontrado");
    
    if(this.commentData.id){
      // this.onUpdate.emit(new EventDTO(false));
      this.onUpdate.emit(
        this.ratingService.deleteCommentAsync(postId, this.commentData.id, this.commentData.author)
      );
    }
  }
}

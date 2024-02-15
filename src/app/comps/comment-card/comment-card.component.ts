import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/model/comment';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input() commentData!:Comment;
}

import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { Comment } from 'src/app/model/comment';
import { EventDTO } from 'src/app/model/eventDTO';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit{
  public onEditMode: boolean = false;
  protected isAuthor: boolean = false;
  protected editCommentContent = "";

  @Input() commentData!: Comment;
  @Input() postId!: string;
  @Output() onUpdate = new EventEmitter<any>(true);

  constructor(private route: ActivatedRoute, private ratingService: RatingService, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.isAuthor = this.firebaseService.userInfoEquals(this.commentData.author.userId);
  }

  saveContentAtEdition(){
    if (!this.onEditMode) return;
    
    if(this.commentData.id)
      this.ratingService.updateCommentContent(this.postId ,this.commentData.id, this.editCommentContent);

    console.log("Postagem: ", this.postId, "Comentario: ", this.commentData.id, this.editCommentContent);
  }

  async deleteComment()
  {
    let postId = this.route.snapshot.paramMap.get('id');
    
    if(postId == null)
      throw new Error("ID do post nao encontrado");
    
    if(this.commentData.id){
      this.onUpdate.next('0')
      from(this.ratingService.deleteCommentAsync(postId, this.commentData.id, this.commentData.author))
        .subscribe({next: (v) => {this.onUpdate.next('1')}})

      
    }
  }

  editComment()
  {
    let postId = this.route.snapshot.paramMap.get('id');

    if(postId == null)
      throw new Error("ID do post nao encontrado");

    if(this.commentData.id){
      this.onEditMode = true;
      this.editCommentContent = this.commentData.text;
    }
  }
}

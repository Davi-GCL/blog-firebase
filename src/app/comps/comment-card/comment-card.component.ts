import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/model/comment';
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
  @Output() onUpdate = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private ratingService: RatingService, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.isAuthor = this.firebaseService.userInfoEquals(this.commentData.author.userId);
  }

  saveContentAtEdition(){
    if (!this.onEditMode) return;
    
    if(this.commentData.id)
      this.ratingService.updateCommentContent(this.postId ,this.commentData.id, this.editCommentContent)

    console.log("Postagem: ", this.postId, "Comentario: ", this.commentData.id, this.editCommentContent)
    
  }

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

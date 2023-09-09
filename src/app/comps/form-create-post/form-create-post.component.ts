import { Component , OnInit , ViewChild} from '@angular/core';
import { FormControl , FormBuilder, FormGroup , Validators} from '@angular/forms';

import { Post } from 'src/app/model/post';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BtnUploadImageComponent } from '../btn-upload-image/btn-upload-image.component';

@Component({
  selector: 'app-form-create-post',
  templateUrl: './form-create-post.component.html',
  styleUrls: ['./form-create-post.component.css']
})
export class FormCreatePostComponent implements OnInit{
  //O ! Sinaliza que o formulario será inicializado depois de sua declaração
  Url:any; 
  formPost!: FormGroup;
  @ViewChild(BtnUploadImageComponent) uploadImages!: BtnUploadImageComponent;

  constructor(private formBuilder: FormBuilder, private firebase: FirebaseService){}

  ngOnInit(): void {
      this.createForm(new Post());
  }

  get title(){
    return this.formPost.get('title')!;
  }

  get text(){
    return this.formPost.get('text')!;
  }

  createForm(newPost:Post){
    this.formPost = this.formBuilder.group({
      title: new FormControl(newPost.title, [Validators.required]),
      text: new FormControl(newPost.text, [Validators.required]),
    });
    
  }

  handleSubmit(event:any) {
    event.preventDefault();
    // aqui você pode implementar a logica para fazer seu formulário salvar
    this.uploadImages.selectedFile;

    let newPost:Post = {
      title: this.formPost.value.title,
      text: this.formPost.value.text,
      thumbnailUrl:'',
      bannerUrl:'',
      author: {userId:'',userName:'',userPhoto:''},
      likes: 0
    }
    
    //this.firebase.createDocument("Posts",{title:"Quarto Post",content:"conteudo", author:"LeroGenerator", datehour: new Date(), likes: 10})
    console.log(this.formPost.value);
    
    // Usar o método reset para limpar os controles na tela
    this.formPost.reset(new Post());
  }
}

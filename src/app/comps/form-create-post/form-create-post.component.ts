import { AfterViewInit, Component , ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl , FormBuilder, FormGroup , Validators} from '@angular/forms';

import { Post } from 'src/app/model/post';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InputImageComponent } from '../input-image/input-image.component';

@Component({
  selector: 'app-form-create-post',
  templateUrl: './form-create-post.component.html',
  styleUrls: ['./form-create-post.component.css']
})
export class FormCreatePostComponent implements OnInit{
  //O ! Sinaliza que o formulario será inicializado depois de sua declaração
  Url:any; 
  formPost!: FormGroup;

  @Input() onEditUrl!:string

  @ViewChild('uploadThumb') uploadThumbnail!: InputImageComponent;
  @ViewChild('uploadBanner') uploadBanner!: InputImageComponent;
  
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
      tag: new FormControl(newPost.tag)
    });
    
  }

  async handleSubmit(event:any) {
    event.preventDefault();
    
    let userId:string = localStorage.getItem('userId')|| '';
    let userName:string = localStorage.getItem('userName')|| '';
    let userPhoto:string = localStorage.getItem('userPhoto') || '';   

    if(userId == '' ){
      alert('Você deve estar cadastrado para publicar!')
      throw new Error('Proibido enviar sem login!')
    }
    else{
      
      // let thumbnailURL = await this.uploadThumbnail.onSubmit()
      let thumbnailURL:any = null
      let bannerURL =  await this.uploadBanner.onSubmit()

      //Trecho que só será executado se o formulario for destinado para atualização de post
      if(this.onEditUrl){
        if(thumbnailURL || bannerURL){
          let updt = await this.firebase.updateDocument("Posts",this.onEditUrl,{
            title:this.formPost.value.title, 
            text: this.formPost.value.text,
            tag : this.formPost.value.tag,
            bannerUrl: bannerURL
          })
          console.log(updt)
        }else{
          let updt = await this.firebase.updateDocument("Posts",this.onEditUrl,{
            title:this.formPost.value.title, 
            text: this.formPost.value.text,
            tag : this.formPost.value.tag
          })
          console.log(updt)
        }

      }else{
        // aqui você pode implementar a logica para fazer seu formulário salvar
        let newPost:Post = {
          title: this.formPost.value.title,
          text: this.formPost.value.text,
          thumbnailUrl: thumbnailURL,
          bannerUrl: bannerURL,
          author: {userId, userName, userPhoto},
          likes: 0,
          datehour: new Date(),
          tag: this.formPost.value.tag
        }
        
        this.firebase.createDocument("Posts",newPost);
        console.log(newPost);
        
        // Usar o método reset para limpar os controles na tela
        this.formPost.reset(new Post());
      }

    }
  }
}

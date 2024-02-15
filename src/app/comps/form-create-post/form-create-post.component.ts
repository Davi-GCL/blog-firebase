import { AfterViewInit, Component , ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl , FormBuilder, FormGroup , Validators} from '@angular/forms';

import { Post } from 'src/app/model/post';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InputImageComponent } from '../input-image/input-image.component';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-create-post',
  templateUrl: './form-create-post.component.html',
  styleUrls: ['./form-create-post.component.css']
})
export class FormCreatePostComponent implements OnInit{
  siteKey!: string;
  captcha!: string | null;

  //O ! Sinaliza que o formulario será inicializado depois de sua declaração
  Url:any; 
  formPost!: FormGroup;
  thumbnailURL!: string;
  bannerURL!: string;

  @Input() onEditUrl!:string

  @ViewChild('uploadThumb') uploadThumbnail!: InputImageComponent;
  @ViewChild('uploadBanner') uploadBanner!: InputImageComponent;
  
  constructor(private formBuilder: FormBuilder, private firebase: FirebaseService, public alertService: AlertService, private router : Router)
  {
    this.siteKey = environment.recaptcha.siteKey;
  }

  ngOnInit(): void {
      this.createForm(new Post());
  }

  get title(){
    return this.formPost.get('title')!;
  }

  get text(){
    return this.formPost.get('text')!;
  }

  captchaResolved(captchaResponse: string | null){
    this.captcha = captchaResponse;
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
    else if(!this.formPost.value.title || !this.formPost.value.text) {
      alert('Formulário invalido!')
      throw new Error('Formulario invalido!')
    }
    else{
      let thumbnailURL = await this.uploadThumbnail.onSubmit()
      // let thumbnailURL:any = null
      let bannerURL =  await this.uploadBanner.onSubmit()
      console.log(bannerURL);

      //Trecho que só será executado se o formulario for destinado para atualização de post
      if(this.onEditUrl){
        if(thumbnailURL || bannerURL){
          let updt = await this.firebase.updateDocument("Posts",this.onEditUrl,{
            title:this.formPost.value.title, 
            text: this.formPost.value.text,
            tag : this.formPost.value.tag,
            bannerUrl: bannerURL? bannerURL : this.bannerURL,
            thumbnailUrl: thumbnailURL? thumbnailURL : this.thumbnailURL,
            datehour: new Date()
          })
          console.log(updt)
        }else{
          let updt = await this.firebase.updateDocument("Posts",this.onEditUrl,{
            title:this.formPost.value.title, 
            text: this.formPost.value.text,
            tag : this.formPost.value.tag,
            datehour: new Date()
          })
          console.log(updt)
        }
        this.alertService.add("Post atualizado com sucesso!");
        this.router.navigate(['/']);
      }else{
        // aqui você pode implementar a logica para fazer seu formulário salvar
        let newPost:Post = {
          title: this.formPost.value.title,
          text: this.formPost.value.text,
          thumbnailUrl: thumbnailURL,
          bannerUrl: bannerURL,
          author: {userId, userName, userPhoto},
          likes: [],
          datehour: new Date(),
          tag: this.formPost.value.tag
        }
        
        let postId = (await this.firebase.createDocument("Posts",newPost)).id;
        // console.log(newPost);
 
        // Usar o método reset para limpar os controles na tela
        this.formPost.reset(new Post());
        this.alertService.add("Post publicado com sucesso!",`Título: ${newPost.title} . Tag: ${newPost.tag}` )
        this.router.navigate(['/']);
      }

    }
  }
}

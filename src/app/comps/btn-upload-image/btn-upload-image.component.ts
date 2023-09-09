import { Component , OnInit , ViewChild , ElementRef, Input } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-btn-upload-image',
  templateUrl: './btn-upload-image.component.html',
  styleUrls: ['./btn-upload-image.component.css']
})
export class BtnUploadImageComponent{
  selectedFile: File | null = null;
  @ViewChild('formThumbnail') formThumbnail!: ElementRef;
  @ViewChild('formBanner') formBanner!: ElementRef;
  @Input() imageUrl: any = ''

  constructor(public firebase: FirebaseService){  }

  enviarFormulario() {
    // Acione o envio do formulário usando o método submit()
    this.formThumbnail.nativeElement.submit();
    this.formBanner.nativeElement.submit();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(event:any, folder:string): void {  
    event.preventDefault();
    if (this.selectedFile) {
      this.firebase.uploadToStorage(`images/${folder}`,this.selectedFile).then((imageUrl) => {
        console.log('URL da imagem:', imageUrl);
        this.imageUrl = imageUrl;
        // Faça algo com a URL da imagem, como exibir ou armazenar no banco de dados.
      }).catch((error) => {
        console.error('Erro ao fazer upload da imagem:', error);
      });
    }
  }

}

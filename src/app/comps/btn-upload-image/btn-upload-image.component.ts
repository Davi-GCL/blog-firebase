import { Component } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-btn-upload-image',
  templateUrl: './btn-upload-image.component.html',
  styleUrls: ['./btn-upload-image.component.css']
})
export class BtnUploadImageComponent {
  selectedFile: File | null = null;

  constructor(public firebase: FirebaseService){  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(event:any, folder:string): void {
    event.preventDefault();
    if (this.selectedFile) {
      this.firebase.uploadToStorage(`images/${folder}`,this.selectedFile).then((imageUrl) => {
        console.log('URL da imagem:', imageUrl);
        // Faça algo com a URL da imagem, como exibir ou armazenar no banco de dados.
      }).catch((error) => {
        console.error('Erro ao fazer upload da imagem:', error);
      });
    }
  }

}

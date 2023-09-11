import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css']
})
export class InputImageComponent {
  constructor(public firebase: FirebaseService){  }

  @Input() destinationFolder:string = '' 
  selectedFile: File | null = null;

  formFile = new FormGroup({
    fileInput: new FormControl('', [Validators.required])
  })

  get file(){
    return this.formFile.controls.fileInput;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit(): Promise<any> {
    let folder = this.destinationFolder;
    let result = 'Nulo'
    // event.preventDefault();
    if (this.selectedFile) {
      let imageUrl = await this.firebase.uploadToStorage(`images/${folder}`,this.selectedFile)
        console.log('URL da imagem:', imageUrl);
        // Faça algo com a URL da imagem, como exibir ou armazenar no banco de dados.
        result = imageUrl

    }
    return result;
  }

}

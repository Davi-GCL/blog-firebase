import { Component } from '@angular/core';

import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-firebase';
  userName:string = 'Seu nome';

  constructor(public auth: FirebaseService){}

  async loginGoogle(){
    try {
      await this.auth.myloginWithGoogle(this.userName).then((res)=>console.log(res.nome));
      // this.userName = user.nome as string;
      console.log("seu nome: "+ this.auth.userName);
    } catch (error) {
      console.log(error)
    }
  }
}

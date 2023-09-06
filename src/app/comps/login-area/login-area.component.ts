import { Component } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login-area',
  templateUrl: './login-area.component.html',
  styleUrls: ['./login-area.component.css']
})
export class LoginAreaComponent {
  userName:string = '';

  constructor(public auth: FirebaseService){}

  async loginGoogle(){
    try {
      await this.auth.myloginWithGoogle().then(res => this.userName = this.auth.userName);
      // console.log("seu nome: "+ this.auth.userName);
    } catch (error) {
      console.log(error)
    }
  }

}

import { Component, OnInit } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login-area',
  templateUrl: './login-area.component.html',
  styleUrls: ['./login-area.component.css']
})
export class LoginAreaComponent implements OnInit {
  userName:string | null = localStorage.getItem('userName');
  userId:string | null = null;

  constructor(public auth: FirebaseService){}
  ngOnInit(): void {
      this.userId = localStorage.getItem('userName');
  }

  async loginGoogle(){
    try {
      await this.auth.myloginWithGoogle().then(res => this.userId = this.auth.user.userId);
      // console.log("seu nome: "+ this.auth.userName);
    } catch (error) {
      console.log(error)
    }
  }

  async logoutGoogle(){
    await this.auth.myLogout();
    localStorage.clear();
  }

}

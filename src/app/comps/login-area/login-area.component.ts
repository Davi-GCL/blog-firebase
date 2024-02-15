import { Component, DoCheck, OnInit } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login-area',
  templateUrl: './login-area.component.html',
  styleUrls: ['./login-area.component.css']
})
export class LoginAreaComponent implements OnInit, DoCheck {
  userName:string | null = localStorage.getItem('userName');
  userId:string | null = null;

  constructor(public auth: FirebaseService){}

  ngOnInit(){
    this.auth.user$.subscribe(value => {
      this.userId = value.userId
      this.userName = value.userName
    })
  }

  //Atualiza a variavel quando o componente sofre atualização(login concluido) semelhante ao useEffect do reactJs
  ngDoCheck(){
    // this.userId = localStorage.getItem('userId')

  }

  async loginGoogle(){
    try {
      this.auth.myloginWithGoogle()
      this.auth.user$.subscribe((value)=>{
        this.userId = value.userId;
        this.userName = value.userName;
      });
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

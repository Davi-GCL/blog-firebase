import { Component, DoCheck } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login-area',
  templateUrl: './login-area.component.html',
  styleUrls: ['./login-area.component.css']
})
export class LoginAreaComponent implements DoCheck {
  userName:string | null = localStorage.getItem('userName');
  userId:string | null = localStorage.getItem('userId');

  constructor(public auth: FirebaseService){}

  //Atualiza a variavel quando o componente sofre atualização(login concluido) semelhante ao useEffect do reactJs
  ngDoCheck(){
    this.userId = localStorage.getItem('userId')
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

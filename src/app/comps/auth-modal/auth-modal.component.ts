import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent {

  constructor(public firebase: FirebaseService, public alertService: AlertService){}

  async loginGoogle(){
    try {
      await this.firebase.myloginWithGoogle().then();
      // console.log("seu nome: "+ this.firebase.userName);
    } catch (error) {
      console.log(error)
    }
  }

  async logoutGoogle(){
    await this.firebase.myLogout();
    localStorage.clear();
  }

  formRegister = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
  })

  onLogin:boolean = true;

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  // get email(){
  //   return this.formRegister.controls.email? this.formRegister.controls.email : "";
  // }

  registerEmail(){
    if(this.formRegister.controls.email.valid && this.formRegister.controls.password.valid){
      this.firebase.signUpEmail(this.formRegister.controls.email.value, 
        this.formRegister.controls.password.value,
        this.formRegister.controls.name.value )
      console.log("Registrado", this.formRegister.controls.email , this.formRegister.controls.password, this.formRegister.controls.name.value)
    }else{
      throw new Error("erro no registro")
    }
  }

  loginEmail(){
    if(this.formLogin.controls.email.valid && this.formLogin.controls.password.valid){
      this.firebase.signInEmail(this.formLogin.controls.email.value, this.formLogin.controls.password.value)
      .then((userInfo)=>{
        this.alertService.add("Login efetuado!","Bem-vindo de volta "+userInfo.userName, "success")
      })
      .catch((error)=>console.error(error))
    }else{
      throw new Error("erro no login")
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent {

  captcha!: string | null;
  siteKey: string;

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

  constructor(public firebase: FirebaseService, public alertService: AlertService)
  {
    this.siteKey = environment.recaptcha.siteKey;
  }

  captchaResolved(captchaResponse:string){
    this.captcha = captchaResponse;
  }

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

  registerEmail(){
    if(!this.captcha) throw new Error('recaptcha nao respondido');

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
    if(!this.captcha) throw new Error('recaptcha nao respondido');

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

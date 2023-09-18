import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

 alert = {
  title: "",
  message: ""
 }

 add(title?:string , message?:string){
    this.alert = {
      title: title as string,
      message: message as string
    }
    setTimeout(() => {
      this.delete()
    }, 8000);
 }

 delete(){
    this.alert = {
      title: "",
      message: ""
    }
 }

}

import { Injectable } from '@angular/core';
import { Alert } from '../model/alert';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertList!: Array<Alert>;
  alertList$ = new BehaviorSubject<Alert[]>([])

 add(title?:string , message?:string, type?:string){
    let id = Math.floor(Math.random()*1000).toString()

    this.alertList$.value.push(new Alert(id,title, message, type))

    this.alertList$.next(this.alertList$.value)

    setTimeout(() => {
      this.delete(id)
    }, 8000);
 }

 delete(id:string){
  this.alertList$.next(this.alertList$.value.filter(value=>value.id != id));
 }

}

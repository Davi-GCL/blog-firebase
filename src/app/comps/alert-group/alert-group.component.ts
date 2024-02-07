import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert-group',
  templateUrl: './alert-group.component.html',
  styleUrls: ['./alert-group.component.css']
})
export class AlertGroupComponent {

  constructor(public alertService: AlertService){}

  handleClose(id:string){
    this.alertService.delete(id)
  }
}

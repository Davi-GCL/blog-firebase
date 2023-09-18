import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent {

constructor(public alertService: AlertService){}

  handleClose(){
    this.alertService.delete()
  }
}

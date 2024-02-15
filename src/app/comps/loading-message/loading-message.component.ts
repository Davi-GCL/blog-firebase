import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-message',
  templateUrl: './loading-message.component.html',
  styleUrls: ['./loading-message.component.css']
})
export class LoadingMessageComponent {
  @Input() variant!: string;
  @Input() colorClass!: string;

}

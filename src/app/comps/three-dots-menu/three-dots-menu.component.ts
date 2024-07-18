import { Component } from '@angular/core';

@Component({
  selector: 'app-three-dots-menu',
  templateUrl: './three-dots-menu.component.html',
  styleUrls: ['./three-dots-menu.component.css']
})
export class ThreeDotsMenuComponent {
  showOptionsMenu: boolean = false;

  toggleOptionsMenu(): void {
    this.showOptionsMenu = !this.showOptionsMenu;
  }
}

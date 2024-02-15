import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  themeSwitcher(event:any){
    console.log(event.target.checked)
    if(event.target.checked){
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
    else{
      document.documentElement.setAttribute('data-bs-theme', 'light')
    }
    // document.documentElement.setAttribute('data-bs-theme', 'dark')
  }

}

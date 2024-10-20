import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  themeToggleInitialValue: boolean = false;

  ngOnInit(): void {
    this.checkTheme()
  }

  checkTheme(){
    let savedTheme = localStorage.getItem('userTheme') ?? 'light';

    document.documentElement.setAttribute('data-bs-theme', savedTheme);

    this.themeToggleInitialValue = savedTheme == 'dark';
  }

  themeSwitch(event:any){
    console.log(event.target.checked)
    if(event.target.checked){
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('userTheme', 'dark');
    }
    else{
      document.documentElement.setAttribute('data-bs-theme', 'light')
      localStorage.setItem('userTheme', 'light');
    }
  }
}

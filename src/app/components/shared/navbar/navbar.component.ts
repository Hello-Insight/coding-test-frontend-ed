import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  message : string = "";

  constructor( private router:Router ) { }

  ngOnInit() {

    var date = new Date();
    var hours = date.getHours();

    if (hours >= 0 && hours < 12) {
      this.message = "Good morning ";
    } else if (hours >= 12 && hours < 18) {
      this.message = "Good afternoon ";
    } else {
      this.message = "Good night ";
    }

//    this.message += sessionStorage.getItem("firstName");
    
    this.message += " ";

  }
/*
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
*/
}

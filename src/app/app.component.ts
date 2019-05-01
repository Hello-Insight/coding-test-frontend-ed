import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xkcd';
  
  showNavBar:boolean = false;

  constructor( private router : Router ) {

    this.router.events.subscribe(value => {
      if (router.url.toString() == "/" || router.url.toString() == "/create-user") {
        this.showNavBar = false;
      } else {
        this.showNavBar = true; 
      }
    });

  }

}

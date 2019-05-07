import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

import * as validate from 'validate.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null
  }
  
  validEmail : boolean = false;
  error : boolean = false;

  constructor( private userService:UserService,
               private router:Router ) { }

  ngOnInit() {
  }
  
  logInApp( form:NgForm ) {
    this.userService.login( form.value as User ).subscribe( res => {
      if (res.status == "401") {
        this.error = true;
      } else {
        this.userService.auth( form.value as User ).subscribe( res2 => {
          console.log(res2.access_token);
          sessionStorage.setItem("token", res2.access_token);
          sessionStorage.setItem("email", form.value.email);
          this.router.navigate(['/comics']);
        });
      }
    });
  }
  
  validateEmail(event) {
    let constraints = {
      from: {
        email: true
      }
    };
    if (validate({from: this.user.email}, constraints)) {
      this.validEmail = false;
    } else {
      this.validEmail = true;
    }
  }
  
  alertClosed() {
    this.error = false;
  }

}

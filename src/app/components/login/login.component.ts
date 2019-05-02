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
/*
    this.loginService.login( form.value as User ).subscribe( user => {
  
      if (user == undefined) {
        //$('#myToast').toast('show');
      } else {
      
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("lastName", user.lastName);
        sessionStorage.setItem("firstName", user.firstName);
        sessionStorage.setItem("role", user.role);
        sessionStorage.setItem("userName", user.userName);
        sessionStorage.setItem("token", user.token);

        this.router.navigate(['/comics']);

      }

    });
*/
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

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

import * as validate from 'validate.js';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user : User = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null
  }

  validEmail : boolean = false;
  success : boolean = false;
  error : boolean = false;
  createdUser : string = ""; 

  constructor( private userService:UserService ) { }

  ngOnInit() {
  }

  createUser ( user:User ) {

    this.userService.createUser( user ).subscribe( res => {

      if (res == undefined) {

        this.error = true;

      } else {

        console.log("res", res);

        this.createdUser = user.email;
        this.success = true;
        this.error = false;

        this.user = {
          id: null,
          first_name: null,
          last_name: null,
          email: null,
          password: null
        }

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
    this.success = false;
    this.createdUser  = ""; 
  }

}

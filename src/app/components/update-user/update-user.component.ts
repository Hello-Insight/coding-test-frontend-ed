import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

import * as validate from 'validate.js';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

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

  constructor( private userService:UserService,
               private router:Router,
               private authService:AuthService ) { }

  ngOnInit() {
    this.user.id = this.authService.identity();
  }

  updateUser( user:User ) {
      this.userService.updateUser( user ).subscribe( res => {
      if (res == undefined) {
        this.error = true;
      } else {
        this.userService.logout().subscribe( res2 => {
          sessionStorage.clear();
          this.router.navigate(['']);
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

}

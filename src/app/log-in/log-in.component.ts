import { Component, OnInit } from '@angular/core';
import {DozerApiService} from '../dozer-api.service';
import {AuthenticationService} from '../Auth/authentication-service.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  phone_number = '';
  pass = '';
  password_verify = '';
  name = '';
  new_password = '';

  constructor(public authenticationService: AuthenticationService , private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  signIn() {
    console.log(this.phone_number);
    this.authenticationService.logIn(this.phone_number , this.pass);
  }

  registerUser() {
    console.log(this.phone_number);
    if (this.new_password === this.password_verify) {
      this.authenticationService.register(this.phone_number , this.pass , this.name);
    } else {
      this._snackBar.open('Passwords Do Not Match');
    }

  }
}

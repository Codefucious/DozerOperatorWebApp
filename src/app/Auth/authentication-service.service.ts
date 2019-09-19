import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DataHolderService} from '../data-holder.service';
import {MatSnackBar} from '@angular/material';
const API_URL = 'http://localhost/DozerAPI/public';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient ,
              private router: Router ,
              private snackBar: MatSnackBar ,
              private dozerDataHolder: DataHolderService)  { }

  logIn(num: string, pass: string) {
    console.log(num);
    console.log(pass);
    this.httpClient.post<any>(API_URL + '/index.php/api/auth/login' ,
      {
        phone_number: num ,
        password: pass,
      }
    ).subscribe( response => {
      console.log(response);
      const convertedData = response as any;
      localStorage.setItem('access_token' , convertedData.access_token);
      this.router.navigate(['menu']);

    } , err => {
      this.snackBar.open((err), 'Ok', {
          duration: 5000,
        });
    });
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }


  getUserInfo() {
    this.httpClient.get<any>(API_URL + '/index.php/api/auth/user'
    ).subscribe( data => {
      this.dozerDataHolder.storeNewUserInfo(data);
    });
  }

  register(num: string, pass: string , name) {
    this.httpClient.post<any>(API_URL + '/index.php/api/auth/signup' ,
      {
        phone_number: num ,
        password: pass,
        password_confirmation: pass,
        name
      }
    ).subscribe( data => {
      const convertedData = data as any;
      localStorage.setItem('access_token' , convertedData.access_token);
      this.router.navigate(['menu']);

    } , err => {
      console.log(err);
      // this.snackBar.open((Object.values(err)[0]), 'Ok', {
      //   duration: 5000,
      // });
    });
  }

  hasAccessToken() {
    return localStorage.hasOwnProperty('access_token');
  }
}

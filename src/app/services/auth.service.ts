import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean = false;
  login: string;
  password: string;

  constructor(private httpClient: HttpClient) { }

  signIn(login, pass) {

    this.login = login;
    this.password = pass;

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.login + ':' + this.password)
    });

    return this.httpClient.post(
      environment.urlApi + "auth/login.php", null,
      { 
        headers: headers
      }
    );
  }

  signOut() {
    this.login = "";
    this.password = "";
    this.isAuth = false;
    sessionStorage.removeItem('credentials');
  }

  isLoggedIn() {
    if(sessionStorage.getItem("credentials")) return true;
    else return false;
  }
}

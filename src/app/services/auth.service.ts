import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;
  login: string;
  password: string;

  private httpOptions: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.login + ':' + this.password)
  });
  }

  signIn(login, pass) {

    this.login = login;
    this.password = pass;

    return this.httpClient.post(
      environment.urlApi + "auth/login.php",
      { 
        observe: 'response',
        headers: this.httpOptions
      }
    );
  }

  signOut() {
    this.login = "";
    this.password = "";
    this.isAuth = false;
  }
}

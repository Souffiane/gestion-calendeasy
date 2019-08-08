import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = true;
  login: string;
  password: string;

  constructor() { }

  signIn(login, pass) {

    this.login = login;
    this.password = pass;

    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);
          }, 2000
        )
      }
    );
  }

  signOut() {
    this.isAuth = false;
  }
}

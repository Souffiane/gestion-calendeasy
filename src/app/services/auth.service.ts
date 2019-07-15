import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = true;

  constructor() { }

  signIn(login, pass) {
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

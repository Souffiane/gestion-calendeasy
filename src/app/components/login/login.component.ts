import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const login = form.value['login'];
    const pass = form.value['pass'];

    this.authService.signIn(login, pass).then(
      () => {
        this.router.navigate(["/comptes"]);
      }
    );
  }

}

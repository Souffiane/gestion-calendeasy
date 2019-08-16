import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const login = form.value['login'];
    const pass = form.value['pass'];

    this.authService.signIn(login, pass).subscribe(
      () => {
        this.router.navigate(["/comptes"]);
        this.authService.isAuth = true;
      },
      (error) => {
        this.snackBar.open("Authentification incorrecte", "Fermer");
      }
    );
  }

}

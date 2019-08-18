import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  deconnexion() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  isAuth(): boolean {
    if(sessionStorage.credentials)
      return true;
    
    return false;
  }

}

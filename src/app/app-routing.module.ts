import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListeCompteComponent } from './components/liste-compte/liste-compte.component';
import { DetailComponent } from './components/detail/detail.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'comptes', component: ListeCompteComponent, canActivate: [AuthguardService] },
  { path: 'detail/:id', component: DetailComponent, canActivate: [AuthguardService] },
  { path: '', component: ListeCompteComponent, canActivate: [AuthguardService] },
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', redirectTo: 'not-found' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

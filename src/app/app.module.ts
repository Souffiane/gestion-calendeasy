import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListeCompteComponent } from './components/liste-compte/liste-compte.component';
import { DetailComponent } from './components/detail/detail.component';

import { AuthService } from './services/auth.service';
import { CompteService } from './services/compte.service';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthguardService } from './services/authguard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListeCompteComponent,
    DetailComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthguardService,
    CompteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

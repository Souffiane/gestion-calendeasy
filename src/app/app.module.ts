import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListeCompteComponent } from './components/liste-compte/liste-compte.component';
import { DetailComponent } from './components/detail/detail.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

import { AuthService } from './services/auth.service';
import { CompteService } from './services/compte.service';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthguardService } from './services/authguard.service';
import { DialogComponent } from './components/dialog/dialog.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    ListeCompteComponent,
    DetailComponent,
    NotfoundComponent,
    DialogComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    AuthService,
    AuthguardService,
    CompteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Compte } from '../models/compte';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  comptesSubject = new Subject<Compte[]>();
  errorSubject = new Subject<any>();
  private comptes:Compte[] = [];

  constructor(private authService: AuthService, private http: HttpClient) { }

  emitComptesSubject() {
    if(this.comptes) this.comptesSubject.next(this.comptes.slice());
  }

  emitErrorSubject(error: any) {
    this.errorSubject.next(error);
  }

  getHttpOptions() {
    const credentials = JSON.parse(sessionStorage.credentials);
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(credentials.login + ':' + credentials.password)
    });
  }

  getComptes() {
    
    this.http.get<Compte[]>(
      environment.urlApi + "compte/read.php",
      { headers: this.getHttpOptions() }
    ).subscribe(
      (response) => {
        this.comptes = response;
        this.emitComptesSubject();
      },
      (error) => {
        this.emitErrorSubject(error);
      }
    );
  }

  getCompteById(id: number): Compte {
    return this.comptes.filter((cpt: Compte) => cpt.id == id)[0];
  }

  addCompte(compte: Compte) {
    return this.http.post(
      environment.urlApi + "compte/create.php", compte,
      { 
        headers: this.getHttpOptions()
      }
    );
  }

  editCompte(compte: Compte) {
    return this.http.post(
      environment.urlApi + "compte/update.php", compte,
      { 
        headers: this.getHttpOptions()
      }
    );
  }

  deleteCompte(compte: Compte) {
    return this.http.post(
      environment.urlApi + "compte/delete.php", compte,
      { 
        headers: this.getHttpOptions()
      }
    );
  }

  updatePassword(compte: Compte) {
    return this.http.post(
      environment.urlApi + "compte/updatePassword.php", compte,
      { 
        headers: this.getHttpOptions()
      }
    );
  }
}

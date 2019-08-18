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
    this.comptes.push(compte);

    this.http.post(
      environment.urlApi + "compte/read.php",
      {
        
      },
      { 
        headers: this.getHttpOptions()
      }
    );
  }

  editCompte(compte: Compte) {
    this.comptes.push(compte);

    this.emitComptesSubject();
  }

  deleteCompte(compte: Compte) {
    let index = this.comptes.indexOf(compte);
    this.comptes.splice(index, 1);

    this.emitComptesSubject();
  }
}

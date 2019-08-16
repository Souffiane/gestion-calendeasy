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

  //private comptes:Compte[];
  private comptes:Compte[] = [
    {id:1, code:'VGQ', nom:'Ville de Grand-Quevilly', forfait:'60', nbManifestation: 4510, nbContact: 42, dateCreation: new Date(2015, 3, 19), dateDerniereConnexion: new Date(2019, 8, 16, 15, 30)},
    {id:2, code:'VLSL', nom:'Ville de Loison-sous-Lens', forfait:'100', nbManifestation: 1864, nbContact: 89, dateCreation: new Date(2015, 5, 2), dateDerniereConnexion: new Date(2019, 8, 16, 11, 41)},
    {id:3, code:'VMRM', nom:'Ville de Maromme', forfait:'150', nbManifestation: 3541, nbContact: 122, dateCreation: new Date(2015, 8, 22), dateDerniereConnexion: new Date(2019, 8, 14, 8, 2)}
  ];

  private httpOptions: HttpHeaders;

  constructor(private authService: AuthService, private http: HttpClient) { 
    this.httpOptions = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(this.authService.login + ':' + this.authService.password)
    });
  }

  emitComptesSubject() {
    if(this.comptes) this.comptesSubject.next(this.comptes.slice());
  }

  emitErrorSubject(error: any) {
    this.errorSubject.next(error);
  }

  getComptes() {
    
    this.http.get<Compte[]>(
      environment.urlApi + "compte/read.php",
      { 
        observe: 'response',
        headers: this.httpOptions
      }
    ).subscribe(
      (response) => {
        console.log(response);

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

    this.emitComptesSubject();
  }

  deleteCompte(compte: Compte) {
    let index = this.comptes.indexOf(compte);
    this.comptes.splice(index, 1);

    this.emitComptesSubject();
  }
}

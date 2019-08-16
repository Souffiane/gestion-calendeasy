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

  private comptes:Compte[];
  // private comptes:Compte[] = [
  //   {id:1, codeClient:'VGQ', nom:'Ville de Grand-Quevilly', typeAbo:'100', dateCreation: new Date(2015, 3, 19)},
  //   {id:2, codeClient:'VLSL', nom:'Ville de Loison-sous-Lens', typeAbo:'100', dateCreation: new Date(2015, 5, 1)},
  //   {id:3, codeClient:'VMRM', nom:'Ville de Maromme', typeAbo:'150', dateCreation: new Date(2015, 9, 1)}
  // ];

  private httpOptions: HttpHeaders;

  constructor(private authService: AuthService, private http: HttpClient) { 
    this.httpOptions = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(this.authService.login + ':' + this.authService.password)
    });
  }

  emitComptesSubject() {
    this.comptesSubject.next(this.comptes.slice());
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

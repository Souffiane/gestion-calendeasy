import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Compte } from '../models/compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  comptesSubject = new Subject<Compte[]>();
  private comptes:Compte[] = [
    {id:1, codeClient:'VGQ', nom:'Ville de Grand-Quevilly', typeAbo:'100', dateCreation: new Date(2015, 3, 19)},
    {id:2, codeClient:'VLSL', nom:'Ville de Loison-sous-Lens', typeAbo:'100', dateCreation: new Date(2015, 5, 1)},
    {id:3, codeClient:'VMRM', nom:'Ville de Maromme', typeAbo:'150', dateCreation: new Date(2015, 9, 1)}
  ];

  constructor() { }

  emitComptesSubject() {
    this.comptesSubject.next(this.comptes.slice());
  }
}

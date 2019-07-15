import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Compte } from '../models/compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  comptesSubject = new Subject<Compte[]>();
  private comptes = [
    new Compte(1, 'VGQ', 'Ville de Grand-Quevilly', '100', new Date(2015, 3, 19)),
    new Compte(1, 'VLSL', 'Ville de Loison-sous-Lens', '100', new Date(2015, 5, 1)),
    new Compte(1, 'VMRM', 'Ville de Maromme', '150', new Date(2015, 9, 1))
  ];

  constructor() { }

  emitComptesSubject() {
    this.comptesSubject.next(this.comptes.slice());
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompteService } from 'src/app/services/compte.service';
import { Compte } from '../../models/compte';

@Component({
  selector: 'app-liste-compte',
  templateUrl: './liste-compte.component.html',
  styleUrls: ['./liste-compte.component.css']
})
export class ListeCompteComponent implements OnInit {

  comptes: Compte[];
  comptesSubscription: Subscription;

  constructor(private compteService: CompteService) { }

  ngOnInit() {
    this.comptesSubscription = this.compteService.comptesSubject.subscribe(
      (comptes: Compte[]) => {
        this.comptes = comptes;
      }
    );
    this.compteService.emitComptesSubject();
  }

  ngOnDestroy() {
    this.comptesSubscription.unsubscribe();
  }

}

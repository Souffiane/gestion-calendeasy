import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompteService } from 'src/app/services/compte.service';
import { Compte } from '../../models/compte';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  dateCreation: Date;
}


@Component({
  selector: 'app-liste-compte',
  templateUrl: './liste-compte.component.html',
  styleUrls: ['./liste-compte.component.css']
})
export class ListeCompteComponent implements OnInit {

  comptesSubscription: Subscription;

  displayedColumns: string[] = ['id','codeClient','nom','typeAbo','dateCreation','btn'];
  dataSource: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private compteService: CompteService, private router: Router) { }

  ngOnInit() {
    this.comptesSubscription = this.compteService.comptesSubject.subscribe(
      (comptes: Compte[]) => {
        this.dataSource = new MatTableDataSource(comptes);
        this.dataSource.sort = this.sort;
      }
    );
    this.compteService.emitComptesSubject();
  }

  ngOnDestroy() {
    this.comptesSubscription.unsubscribe();
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim();
  }

  edit(compte) {
    this.router.navigate(['/detail', compte.id]);
  }

  delete(compte) {
    
  }

}

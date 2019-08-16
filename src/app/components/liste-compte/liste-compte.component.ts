import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompteService } from 'src/app/services/compte.service';
import { Compte } from '../../models/compte';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

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
  errorComptesSubscription: Subscription;

  displayedColumns: string[] = ['id','codeClient','nom','typeAbo','dateCreation','btn'];
  dataSource: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private compteService: CompteService, 
    private router: Router, 
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.comptesSubscription = this.compteService.comptesSubject.subscribe(
      (comptes: Compte[]) => {
        this.dataSource = new MatTableDataSource(comptes);
        this.dataSource.sort = this.sort;
      }
    );

    this.errorComptesSubscription = this.compteService.errorSubject.subscribe(
      (error) => {
        console.log(error);
        this.snackBar.open("Erreur lors du chargement des comptes", "Fermer");
      }
    );

    this.compteService.emitComptesSubject();
  }

  ngOnDestroy() {
    this.comptesSubscription.unsubscribe();
    this.errorComptesSubscription.unsubscribe();
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim();
  }

  edit(compte: Compte) {
    this.router.navigate(['/detail', compte.id]);
  }

  delete(compte: Compte): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: compte
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'oui')
      {
        this.compteService.deleteCompte(compte);
      }
    });
  }

}

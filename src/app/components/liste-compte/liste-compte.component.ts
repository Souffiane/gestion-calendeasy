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
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-liste-compte',
  templateUrl: './liste-compte.component.html',
  styleUrls: ['./liste-compte.component.css']
})
export class ListeCompteComponent implements OnInit {

  comptesSubscription: Subscription;
  errorComptesSubscription: Subscription;

  displayedColumns: string[] = ['id','code','nom','forfait','nbContact','nbManifestation','dateDerniereConnexion','dateCreation','btn'];
  dataSource: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  isLoading: boolean = false;

  constructor(
    private utilsService: UtilsService,
    private compteService: CompteService, 
    private router: Router, 
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    
    this.isLoading = true;

    this.comptesSubscription = this.compteService.comptesSubject.subscribe(
      (comptes: Compte[]) => {
        this.dataSource = new MatTableDataSource(comptes);
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );

    this.errorComptesSubscription = this.compteService.errorSubject.subscribe(
      (error) => {
        console.log(error);
        this.snackBar.open("Erreur lors du chargement des comptes", "Fermer");
      }
    );

    this.compteService.getComptes();
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
      width: '400px',
      data: {
        compte: compte,
        title: compte.nom,
        question: "Voulez-vous vraiment supprimer ce compte ?",
        validationText: "Oui",
        cancelText: "Non"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'oui')
      {
        this.isLoading = true;
        this.compteService.deleteCompte(compte).subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open("Compte supprimé", "Fermer");
          },
          (error) => {
            this.isLoading = false;
            this.snackBar.open("Erreur lors de la suppression du compte", "Fermer");
          }
        );
      }
    });
  }

  newPass(compte:Compte) {
    compte.password = this.utilsService.generatePassword();

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        compte: compte,
        title: compte.nom,
        question: "Voulez-vous vraiment affecter ce mot de passe " + compte.password + " ?",
        validationText: "Oui",
        cancelText: "Non"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'oui')
      {
        this.isLoading = true;
        this.compteService.updatePassword(compte).subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open("Compte supprimé", "Fermer");
          },
          (error) => {
            this.isLoading = false;
            this.snackBar.open("Erreur lors de la suppression du compte", "Fermer");
          }
        );
      }
    });

    
    
  }

}

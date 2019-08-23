import { Component, OnInit } from '@angular/core';
import { Compte } from 'src/app/models/compte';
import { CompteService } from 'src/app/services/compte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  newCompte: boolean = false;
  editCompte: boolean = false;
  title: string = "Nouveau compte";

  idCompteEdit: number = 0;
  compte: Compte;
  compteForm: FormGroup;
  
  constructor(
    private utilsService: UtilsService,
    private compteService: CompteService, 
    private route: Router,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.idCompteEdit = +this.router.snapshot.params["id"];
    if(this.idCompteEdit > 0) {
      this.compte = this.compteService.getCompteById(this.idCompteEdit);
      if(!this.compte)
      {
        this.route.navigate(['comptes']);
      }
      this.editCompte = true;
      this.title = "Détail";
    }
    else {
      this.newCompte = true;
    }

    this.initForm();
  }

  initForm() {
    const code = this.compte ? this.compte.code : '';
    const nom = this.compte ? this.compte.nom : '';
    const typeAbo = this.compte ? this.compte.forfait : '';
    const email = this.compte ? this.compte.email : '';
    const pass = this.utilsService.generatePassword();

    this.compteForm = this.formBuilder.group({
      code: new FormControl({value: code, disabled: this.editCompte}, Validators.required),
      nom: [nom, Validators.required],
      forfait: [typeAbo, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      password: [pass, Validators.required]
    });
  }

  onSubmitForm() {
    const values = this.compteForm.value;
    this.compte = {
      id: this.idCompteEdit,
      code: values['code'],
      nom: values['nom'],
      forfait: values['forfait'],
      email:  values['email'],
      password: values['password'],
      nbContact: 0,
      nbManifestation: 0,
      dateCreation: new Date(),
      dateDerniereConnexion: null
    };

    if(!this.idCompteEdit || this.idCompteEdit == 0)
    {  
      this.compteService.addCompte(this.compte).subscribe(
        () => {
          this.snackBar.open("Compte créé", "Fermer");
          this.route.navigate(['comptes']);
        },
        (error) => {
          this.snackBar.open("Erreur lors de la création du compte", "Fermer");
        }
      );
    }
    else {
      this.compteService.editCompte(this.compte).subscribe(
        () => {
          this.snackBar.open("Compte modifié", "Fermer");
          this.route.navigate(['comptes']);
        },
        (error) => {
          this.snackBar.open("Erreur lors de la modification du compte", "Fermer");
        }
      );;
    }
  }
  
  reloadPass() {
    this.compteForm.controls['password'].setValue(this.utilsService.generatePassword());
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { Compte } from 'src/app/models/compte';
import { CompteService } from 'src/app/services/compte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private compteService: CompteService, 
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.idCompteEdit = +this.router.snapshot.params["id"];
    if(this.idCompteEdit > 0) {
      this.compte = this.compteService.getCompteById(this.idCompteEdit);
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
    
    this.compteForm = this.formBuilder.group({
      code: [code, Validators.required],
      nom: [nom, Validators.required],
      forfait: [typeAbo, Validators.required],
      email: [email, Validators.email]
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
      nbContact: 0,
      nbManifestation: 0,
      dateCreation: new Date(),
      dateDerniereConnexion: null
    };

    if(this.idCompteEdit == 0)
      this.compteService.addCompte(this.compte);
    else
      this.compteService.editCompte(this.compte);
  }
}

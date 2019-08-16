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

  compte: Compte;
  compteForm: FormGroup;
  
  constructor(
    private compteService: CompteService, 
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const idCompte = +this.router.snapshot.params["id"];
    if(idCompte > 0) {
      this.compte = this.compteService.getCompteById(idCompte);
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
    
    this.compteForm = this.formBuilder.group({
      code: [code, Validators.required],
      nom: [nom, Validators.required],
      forfait: [typeAbo, Validators.required]
    });
  }

  onSubmitForm() {
    const values = this.compteForm.value;
    this.compte = {
      id: 0,
      code: values['code'],
      nom: values['nom'],
      forfait: values['forfait'],
      nbContact: 0,
      nbManifestation: 0,
      dateCreation: new Date(),
      dateDerniereConnexion: null
    };

    this.compteService.addCompte(this.compte);
  }
}

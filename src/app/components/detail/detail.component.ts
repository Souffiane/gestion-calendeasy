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
    
    const code = this.compte ? this.compte.codeClient : '';
    const nom = this.compte ? this.compte.nom : '';
    const typeAbo = this.compte ? this.compte.typeAbo : '';
    
    this.compteForm = this.formBuilder.group({
      codeClient: [code, Validators.required],
      nom: [nom, Validators.required],
      typeAbo: [typeAbo, Validators.required]
    });
  }

  onSubmitForm() {
    const values = this.compteForm.value;
    this.compte = {
      id: 0,
      codeClient: values['codeClient'],
      nom: values['nom'],
      typeAbo: values['typeAbo'],
      dateCreation: new Date()
    };

    this.compteService.addCompte(this.compte);
  }
}

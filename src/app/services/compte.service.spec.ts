import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CompteService } from './compte.service';
import { Compte } from '../models/compte';
import { environment } from 'src/environments/environment';

describe('CompteService', () => {
  let mockHttp: HttpTestingController;
  const listeCompteTest:Compte[] = [
    {id: 4, code: "TEST", nom: "Ville du Coin", forfait: "200", nbManifestation: 98, nbContact: 32, dateDerniereConnexion: new Date("2019-08-23 08:21:37"), dateCreation: new Date("2015-01-01"), password: "abdcdef", email: "mail@villeducoin.fr"},
    {id: 5, code: "75000", nom: "Ville de Paris", forfait: "150", nbManifestation: 1750, nbContact: 44, dateDerniereConnexion: new Date("2019-08-26 13:58:49"), dateCreation: new Date("2015-04-03"), password: "12456", email: "mail@paris.fr"}
  ];1
  const compteTest:Compte = {id: 6, code: "33000", nom: "Ville de Bordeaux", forfait: "150", nbManifestation: 2114, nbContact: 98, dateDerniereConnexion: new Date("2019-08-26 13:58:49"), dateCreation: new Date("2015-04-03"), password: "12456", email: "mail@bordeaux.fr"};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompteService]
    });

    mockHttp = TestBed.get(HttpTestingController);

    spyOn(window.sessionStorage, 'getItem').and.callFake(function() {
			return '{"login": "test", "password": "testpass"}';
    });
  });

  it('should be created', inject([CompteService], (service: CompteService) => {
    expect(service).toBeTruthy();
  }));

  it('should return HttpClientHeader for getHttpOptions()', inject([CompteService], (service: CompteService) => {

    let act = service.getHttpOptions();

    expect(act.get("Content-Type")).toBe('application/json');
    expect(act.get("Authorization")).toBe('Basic ' + btoa('test:testpass'));
  }));

  it('should return comptes for getComptes()', inject([CompteService], (service: CompteService) => {
    
    service.comptesSubject.subscribe((comptes: Compte[]) => {
      expect(comptes).toBeDefined();
      expect(comptes.length).toBe(2);
      
      const cpt1: Compte = comptes[0];

      expect(cpt1.id).toBe(4);
      expect(cpt1.code).toBe("TEST");
      expect(cpt1.nom).toBe("Ville du Coin");
      expect(cpt1.forfait).toBe("200");
      expect(cpt1.nbManifestation).toBe(98);
      expect(cpt1.nbContact).toBe(32);
      expect(cpt1.dateDerniereConnexion).toEqual(new Date("2019-08-23 08:21:37"));
      expect(cpt1.dateCreation).toEqual(new Date("2015-01-01"));
      
      const cpt2: Compte = comptes[1];

      expect(cpt2.id).toBe(5);
      expect(cpt2.code).toBe("75000");
      expect(cpt2.nom).toBe("Ville de Paris");
      expect(cpt2.forfait).toBe("150");
      expect(cpt2.nbManifestation).toBe(1750);
      expect(cpt2.nbContact).toBe(44);
      expect(cpt2.dateDerniereConnexion).toEqual(new Date("2019-08-26 13:58:49"));
      expect(cpt2.dateCreation).toEqual(new Date("2015-04-03"));
    });

    service.getComptes();

    const mockRequest = mockHttp.expectOne(environment.urlApi + "compte/read.php");
    expect(mockRequest.request.method).toBe("GET");
    expect(mockRequest.request.headers.get("Content-Type")).toBe("application/json");
    expect(mockRequest.request.headers.get("Authorization")).toBe("Basic " + btoa('test:testpass'));
    mockRequest.flush(listeCompteTest);

    mockHttp.verify();
  }));

  it('should get compte for getCompteById()', inject([CompteService], (service: CompteService) => {
    
    service.comptesSubject.subscribe((comptes: Compte[]) => {
      const cpt = service.getCompteById(4);

      expect(cpt).toBeDefined();
      expect(cpt.id).toBe(4);
      expect(cpt.nom).toBe("Ville du Coin");
    });

    service.getComptes();

    const mockRequest = mockHttp.expectOne(environment.urlApi + "compte/read.php");
    mockRequest.flush(listeCompteTest);
  }));

  it('should call API for addCompte()', inject([CompteService], (service: CompteService) => {
    
    service.addCompte(compteTest).subscribe();

    const mockRequest = mockHttp.expectOne(environment.urlApi + "compte/create.php");
    expect(mockRequest.request.method).toBe("POST");
    expect(mockRequest.request.headers.get("Content-Type")).toBe("application/json");
    expect(mockRequest.request.headers.get("Authorization")).toBe("Basic " + btoa('test:testpass'));
    mockRequest.flush("ok");

    mockHttp.verify();
  }));

  it('should call API for editCompte()', inject([CompteService], (service: CompteService) => {
    
    service.editCompte(compteTest).subscribe();

    const mockRequest = mockHttp.expectOne(environment.urlApi + "compte/update.php");
    expect(mockRequest.request.method).toBe("POST");
    expect(mockRequest.request.headers.get("Content-Type")).toBe("application/json");
    expect(mockRequest.request.headers.get("Authorization")).toBe("Basic " + btoa('test:testpass'));
    mockRequest.flush("ok");

    mockHttp.verify();
  }));

  it('should call API for deleteCompte()', inject([CompteService], (service: CompteService) => {
    
    service.deleteCompte(compteTest).subscribe();

    const mockRequest = mockHttp.expectOne(environment.urlApi + "compte/delete.php");
    expect(mockRequest.request.method).toBe("POST");
    expect(mockRequest.request.headers.get("Content-Type")).toBe("application/json");
    expect(mockRequest.request.headers.get("Authorization")).toBe("Basic " + btoa('test:testpass'));
    mockRequest.flush("ok");

    mockHttp.verify();
  }));

  it('should call API for updatePassword()', inject([CompteService], (service: CompteService) => {
    
    service.updatePassword(compteTest).subscribe();

    const mockRequest = mockHttp.expectOne(environment.urlApi + "compte/updatePassword.php");
    expect(mockRequest.request.method).toBe("POST");
    expect(mockRequest.request.headers.get("Content-Type")).toBe("application/json");
    expect(mockRequest.request.headers.get("Authorization")).toBe("Basic " + btoa('test:testpass'));
    mockRequest.flush("ok");

    mockHttp.verify();
  }));
  
});

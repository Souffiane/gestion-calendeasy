import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CompteService } from './compte.service';
import { Compte } from '../models/compte';
import { formatDate } from '@angular/common';

describe('CompteService', () => {
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompteService]
    });

    mockHttp = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([CompteService], (service: CompteService) => {
    expect(service).toBeTruthy();
  }));

  it('should return HttpClientHeader for getHttpOptions()', inject([CompteService], (service: CompteService) => {
    spyOn(window.sessionStorage, 'getItem').and.callFake(function() {
			return '{"login": "test", "password": "testpass"}';
    });

    let act = service.getHttpOptions();

    expect(act.get("Content-Type")).toBe('application/json');
    expect(act.get("Authorization")).toBe('Basic ' + btoa('test:testpass'));
  }));

  it('should set comptes for getComptes()', inject([CompteService], (service: CompteService) => {
    spyOn(window.sessionStorage, 'getItem').and.callFake(function() {
			return '{"login": "test", "password": "testpass"}';
    });
    
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

    const mockRequest = mockHttp.expectOne("http://localhost/calendeasy-gestion-api/compte/read.php");
    expect(mockRequest.request.method).toBe("GET");
    expect(mockRequest.request.headers.get("Content-Type")).toBe("application/json");
    expect(mockRequest.request.headers.get("Authorization")).toBe("Basic " + btoa('test:testpass'));
    mockRequest.flush([
      {id:4,code:"TEST",nom:"Ville du Coin",forfait:"200",nbManifestation:98,nbContact:32,dateDerniereConnexion:new Date("2019-08-23 08:21:37"),dateCreation:new Date("2015-01-01")},
      {id:5,code:"75000",nom:"Ville de Paris",forfait:"150",nbManifestation:1750,nbContact:44,dateDerniereConnexion:new Date("2019-08-26 13:58:49"),dateCreation:new Date("2015-04-03")}
    ]);

    mockHttp.verify();
  }));
});

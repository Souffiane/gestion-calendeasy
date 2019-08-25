import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CompteService } from './compte.service';

describe('CompteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompteService]
    });
  });

  it('should be created', inject([CompteService], (service: CompteService) => {
    expect(service).toBeTruthy();
  }));
});

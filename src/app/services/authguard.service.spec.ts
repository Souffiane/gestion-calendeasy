import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthguardService } from './authguard.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthguardService', () => {
  const spyAuthService = jasmine.createSpyObj('spyAuthService', ['isLoggedIn']);
  const spyRouter = jasmine.createSpyObj('spyRouter', ['navigate']);
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{
        provide: AuthService,
        useValue: spyAuthService
      },{
        provide: Router,
        useValue: spyRouter
      }]
    });
  });

  it('should be created', inject([AuthguardService], (service: AuthguardService) => {
    expect(service).toBeTruthy();
  }));

  it('should return true for a logged in user', inject([AuthguardService], (service: AuthguardService) => {
    spyAuthService.isLoggedIn.and.returnValue(true);
    const ret = service.canActivate(null, null);
    expect(ret).toBeTruthy();
  }));

  it('should navigate to login for a logged out user', inject([AuthguardService], (service: AuthguardService) => {
    spyAuthService.isLoggedIn.and.returnValue(false);
    const ret = service.canActivate(null, null);
    expect(ret).toBeFalsy();
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/login']);
  }));
});

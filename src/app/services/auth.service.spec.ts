import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    mockHttp = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should empty data for signOut()', inject([AuthService], (service: AuthService) => {
    service.signOut();

    expect(service.login).toBe("");
    expect(service.password).toBe("");
    expect(service.isAuth).toBeFalsy();
  }));

  it('should call api for signIn()', inject([AuthService], (service: AuthService) => {
    let login = "test";
    let pass = "pass";
    
    service.signIn(login, pass).subscribe((res) => {
      expect(res).toBe("ok");
    });

    const mockRequest = mockHttp.expectOne("http://localhost/calendeasy-gestion-api/auth/login.php");
    expect(mockRequest.request.method).toBe("POST");
    expect(mockRequest.request.headers.get("Content-Type")).toBe("application/json");
    expect(mockRequest.request.headers.get("Authorization")).toBe("Basic " + btoa(login + ':' + pass));
    mockRequest.flush("ok");

    mockHttp.verify();
  }));

  it('should return true for logged in user', inject([AuthService], (service: AuthService) => {
    spyOn(window.sessionStorage, 'getItem').and.callFake(function() {
			return "ok";
		});
    expect(service.isLoggedIn()).toBeTruthy();
  }));

  it('should return false for logged out user', inject([AuthService], (service: AuthService) => {
    
    spyOn(window.sessionStorage, 'getItem').and.callFake(function() {
			return undefined;
		});
    expect(service.isLoggedIn()).toBeFalsy();
  }));
});

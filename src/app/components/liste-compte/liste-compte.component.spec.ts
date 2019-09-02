import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ListeCompteComponent } from './liste-compte.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatTableModule, MatPaginatorModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { CompteService } from 'src/app/services/compte.service';

describe('ListeCompteComponent', () => {
  let component: ListeCompteComponent;
  let fixture: ComponentFixture<ListeCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeCompteComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [ CompteService ]
    })
    .compileComponents();
    
    spyOn(window.sessionStorage, 'getItem').and.callFake(function() {
			return '{"login": "test", "password": "testpass"}';
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([CompteService], (service: CompteService) => {
    
    expect(component).toBeTruthy();
    expect(service).toBeTruthy();

  }));
});

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule, 
  MatListModule, 
  MatButtonModule, 
  MatCardModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatTableModule, 
  MatSortModule, 
  MatDialogModule, 
  MatSelectModule, 
  MatProgressBarModule,
  MatTooltipModule,
  MatPaginatorModule
} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    LayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatPaginatorModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }

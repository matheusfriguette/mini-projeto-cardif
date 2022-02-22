import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsListComponent } from './schools-list.component';
import { SchoolsListRoutingModule } from './schools-list-routing.module';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    SchoolsListRoutingModule,
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  declarations: [SchoolsListComponent],
})
export class SchoolsListModule {}

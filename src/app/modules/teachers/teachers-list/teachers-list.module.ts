import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersListComponent } from './teachers-list.component';
import { TeachersListRoutingModule } from './teachers-list-routing.module';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    TeachersListRoutingModule,
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  declarations: [TeachersListComponent],
})
export class TeachersListModule {}

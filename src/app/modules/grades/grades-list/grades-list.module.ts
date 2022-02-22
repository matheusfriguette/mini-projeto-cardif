import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesListComponent } from './grades-list.component';
import { GradesListRoutingModule } from './grades-list-routing.module';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    GradesListRoutingModule,
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  declarations: [GradesListComponent],
})
export class GradesListModule {}

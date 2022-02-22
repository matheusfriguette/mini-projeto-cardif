import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesRegisterComponent } from './grades-register.component';
import { GradesRegisterRoutingModule } from './grades-register-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GradesRegisterRoutingModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
  ],
  declarations: [GradesRegisterComponent],
})
export class GradesRegisterModule {}

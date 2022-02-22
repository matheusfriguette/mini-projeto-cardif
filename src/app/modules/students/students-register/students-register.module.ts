import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRegisterComponent } from './students-register.component';
import { StudentsRegisterRoutingModule } from './students-register-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentsRegisterRoutingModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [StudentsRegisterComponent],
})
export class StudentsRegisterModule {}

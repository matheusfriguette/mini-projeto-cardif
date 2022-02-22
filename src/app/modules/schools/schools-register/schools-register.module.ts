import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsRegisterComponent } from './schools-register.component';
import { SchoolsRegisterRoutingModule } from './schools-register-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SchoolsRegisterRoutingModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [SchoolsRegisterComponent],
})
export class SchoolsRegisterModule {}

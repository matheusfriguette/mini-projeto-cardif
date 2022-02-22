import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersRegisterComponent } from './teachers-register.component';
import { TeachersRegisterRoutingModule } from './teachers-register-routing.module';
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
    TeachersRegisterRoutingModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [TeachersRegisterComponent],
})
export class TeachersRegisterModule {}

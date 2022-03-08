import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRegisterComponent } from './users-register.component';
import { UsersRegisterRoutingModule } from './users-register-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRegisterRoutingModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  declarations: [UsersRegisterComponent],
})
export class UsersRegisterModule {}

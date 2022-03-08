import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SchoolsService } from 'src/app/modules/schools/schools.service';
import { User } from 'src/app/shared/models/user';
import { Auth } from 'src/app/shared/stores/auth/auth.actions';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private schoolsService: SchoolsService,
    private store: Store
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.authService
      .login(
        this.loginForm.get('user')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe({
        next: this.handleLoginSuccess.bind(this),
        error: this.handleLoginError.bind(this),
      });
  }

  handleLoginSuccess(user: User) {
    this.snackBar.open('Seja bem vindo!', 'Fechar', {
      duration: 5000,
    });
    this.schoolsService
      .getSchool(user.defaultSchool || 1)
      .subscribe((school) => {
        this.store.dispatch([
          new Auth.UpdateUser(user),
          new Auth.UpdateCurrentSchool(school),
        ]);
        this.router.navigate(['/students']);
      });
  }

  handleLoginError() {
    this.snackBar.open('Usuário ou senha incorreta!', 'Fechar', {
      duration: 5000,
    });
  }
}

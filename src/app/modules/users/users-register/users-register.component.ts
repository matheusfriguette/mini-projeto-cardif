import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/models/school';
import { User } from 'src/app/shared/models/user';
import { SchoolsState } from 'src/app/shared/stores/schools/schools.state';
import { Users } from 'src/app/shared/stores/users/users.actions';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.scss'],
})
export class UsersRegisterComponent implements OnInit {
  @Select(SchoolsState.getData) schoolOptions$!: Observable<School[]>;

  userForm: FormGroup;
  isEditing = false;
  roleOptions = [
    { name: 'Administrador', value: 'admin' },
    { name: 'Comum', value: 'common' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store
  ) {
    this.userForm = this.formBuilder.group({
      id: [''],
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      defaultSchool: ['', []],
    });
  }

  ngOnInit() {
    this.checkIfIsEditing();
  }

  checkIfIsEditing() {
    if (!!this.activatedRoute.snapshot.params['id']) {
      const id = this.activatedRoute.snapshot.params['id'];
      this.isEditing = true;
      this.store.dispatch(new Users.GetOne(id)).subscribe(() => {
        const user = this.store.selectSnapshot<User>(
          (state) => state.users.user
        );
        this.userForm.setValue({
          id: user.id,
          user: user.user,
          password: user.password,
          role: user.role,
          defaultSchool: user.defaultSchool || '',
        });
      });
    }
  }

  goToList() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    if (this.isEditing) {
      this.store.dispatch(new Users.Update(this.userForm.value)).subscribe({
        next: this.handlerSaveSuccess.bind(this),
      });
    } else {
      this.store.dispatch(new Users.Register(this.userForm.value)).subscribe({
        next: this.handlerSaveSuccess.bind(this),
      });
    }
  }

  handlerSaveSuccess() {
    this.snackBar.open('Item salvo com sucesso!', 'Fechar', {
      duration: 5000,
    });
    this.router.navigate(['/users']);
  }

  public selectedSchoolComparison = (
    schoolOption: School,
    schoolValue: School
  ): boolean => {
    return schoolOption.id === schoolValue.id;
  };
}

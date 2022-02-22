import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Teacher } from 'src/app/shared/models/teacher';
import { Teachers } from 'src/app/shared/stores/teachers/teachers.actions';

@Component({
  selector: 'app-teachers-register',
  templateUrl: './teachers-register.component.html',
  styleUrls: ['./teachers-register.component.scss'],
})
export class TeachersRegisterComponent implements OnInit {
  teacherForm: FormGroup;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store
  ) {
    this.teacherForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.checkIfIsEditing();
  }

  checkIfIsEditing() {
    if (!!this.activatedRoute.snapshot.params['id']) {
      const id = this.activatedRoute.snapshot.params['id'];
      this.isEditing = true;
      this.store.dispatch(new Teachers.GetOne(id)).subscribe(() => {
        const teacher = this.store.selectSnapshot<Teacher>(
          (state) => state.teachers.teacher
        );
        this.teacherForm.setValue({
          id: teacher.id,
          name: teacher.name,
          email: teacher.email,
          phone: teacher.phone,
        });
      });
    }
  }

  goToList() {
    this.router.navigate(['/teachers']);
  }

  onSubmit() {
    if (this.isEditing) {
      this.store
        .dispatch(new Teachers.Update(this.teacherForm.value))
        .subscribe({
          next: this.handlerSaveSuccess.bind(this),
        });
    } else {
      this.store
        .dispatch(new Teachers.Register(this.teacherForm.value))
        .subscribe({
          next: this.handlerSaveSuccess.bind(this),
        });
    }
  }

  handlerSaveSuccess() {
    this.snackBar.open('Item salvo com sucesso!', 'Fechar', {
      duration: 5000,
    });
    this.router.navigate(['/teachers']);
  }
}

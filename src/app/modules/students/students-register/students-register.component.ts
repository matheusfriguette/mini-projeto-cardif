import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Grade } from 'src/app/shared/models/grade';
import { Student } from 'src/app/shared/models/student';
import { GradesState } from 'src/app/shared/stores/grades/grades.state';
import { Students } from 'src/app/shared/stores/students/students.actions';

@Component({
  selector: 'app-students-register',
  templateUrl: './students-register.component.html',
  styleUrls: ['./students-register.component.scss'],
})
export class StudentsRegisterComponent implements OnInit {
  @Select(GradesState.getData) gradeOptions$!: Observable<Grade[]>;

  studentForm: FormGroup;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store
  ) {
    this.studentForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      grade: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.checkIfIsEditing();
  }

  checkIfIsEditing() {
    if (!!this.activatedRoute.snapshot.params['id']) {
      const id = this.activatedRoute.snapshot.params['id'];
      this.isEditing = true;
      this.store.dispatch(new Students.GetOne(id)).subscribe(() => {
        const student = this.store.selectSnapshot<Student>(
          (state) => state.students.student
        );
        this.studentForm.setValue({
          id: student.id,
          name: student.name,
          email: student.email,
          birthday: student.birthday,
          grade: student.grade,
        });
      });
    }
  }

  goToList() {
    this.router.navigate(['/students']);
  }

  onSubmit() {
    if (this.isEditing) {
      this.store
        .dispatch(new Students.Update(this.studentForm.value))
        .subscribe({
          next: this.handlerSaveSuccess.bind(this),
        });
    } else {
      this.store
        .dispatch(new Students.Register(this.studentForm.value))
        .subscribe({
          next: this.handlerSaveSuccess.bind(this),
        });
    }
  }

  handlerSaveSuccess() {
    this.snackBar.open('Item salvo com sucesso!', 'Fechar', {
      duration: 5000,
    });
    this.router.navigate(['/students']);
  }

  public selectedGradeComparison = (
    gradeOption: Grade,
    gradeValue: Grade
  ): boolean => {
    return gradeOption.id === gradeValue.id;
  };
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Grade } from 'src/app/shared/models/grade';
import { Teacher } from 'src/app/shared/models/teacher';
import { Grades } from 'src/app/shared/stores/grades/grades.actions';
import { Teachers } from 'src/app/shared/stores/teachers/teachers.actions';
import { TeachersState } from 'src/app/shared/stores/teachers/teachers.state';

@Component({
  selector: 'app-grades-register',
  templateUrl: './grades-register.component.html',
  styleUrls: ['./grades-register.component.scss'],
})
export class GradesRegisterComponent implements OnInit {
  @Select(TeachersState.getData) teacherOptions$!: Observable<Teacher[]>;

  gradeForm: FormGroup;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store
  ) {
    this.gradeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      subjects: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', [Validators.required]],
          teacher: ['', [Validators.required]],
        }),
      ]),
    });
  }

  ngOnInit() {
    this.getTeachers();
    this.checkIfIsEditing();
  }

  getTeachers() {
    this.store.dispatch(new Teachers.List());
  }

  checkIfIsEditing() {
    if (!!this.activatedRoute.snapshot.params['id']) {
      const id = this.activatedRoute.snapshot.params['id'];
      this.isEditing = true;
      this.store.dispatch(new Grades.GetOne(id)).subscribe(() => {
        const grade = this.store.selectSnapshot<Grade>(
          (state) => state.grades.grade
        );
        this.subjectsForm.removeAt(0);
        this.gradeForm.patchValue({
          id: grade.id,
          name: grade.name,
        });
        grade.subjects.forEach((item) => {
          this.subjectsForm.push(
            this.formBuilder.group({
              name: [item.name],
              teacher: [item.teacher],
            })
          );
        });
      });
    }
  }

  goToList() {
    this.router.navigate(['/grades']);
  }

  onSubmit() {
    if (this.isEditing) {
      this.store.dispatch(new Grades.Update(this.gradeForm.value)).subscribe({
        next: this.handlerSaveSuccess.bind(this),
      });
    } else {
      this.store.dispatch(new Grades.Register(this.gradeForm.value)).subscribe({
        next: this.handlerSaveSuccess.bind(this),
      });
    }
  }

  handlerSaveSuccess() {
    this.snackBar.open('Item salvo com sucesso!', 'Fechar', {
      duration: 5000,
    });
    this.router.navigate(['/grades']);
  }

  handlerSaveError() {
    this.snackBar.open('Erro ao salvar item!', 'Fechar', {
      duration: 5000,
    });
  }

  get subjectsForm(): FormArray {
    return this.gradeForm.get('subjects') as FormArray;
  }

  addNewSubject() {
    this.subjectsForm.push(
      this.formBuilder.group({
        name: [''],
        teacher: [''],
      })
    );
  }

  deleteSubject(index: number) {
    this.subjectsForm.removeAt(index);
  }

  public selectedTeacherComparison = (
    teacherOption: Teacher,
    teacherValue: Teacher
  ): boolean => {
    return teacherOption.id === teacherValue.id;
  };
}

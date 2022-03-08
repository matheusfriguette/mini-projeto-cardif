import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NgxsModule, Store } from '@ngxs/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthState } from 'src/app/shared/stores/auth/auth.state';
import { GradesState } from 'src/app/shared/stores/grades/grades.state';
import { SchoolsState } from 'src/app/shared/stores/schools/schools.state';
import { StudentsState } from 'src/app/shared/stores/students/students.state';
import { TeachersState } from 'src/app/shared/stores/teachers/teachers.state';
import { UsersState } from 'src/app/shared/stores/users/users.state';
import { StudentsListComponent } from './students-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { StudentsService } from '../students.service';

export const StudentsStateMock = {
  data: [
    {
      id: 1,
      student: 'test',
      password: 'test',
      role: 'admin',
    },
  ],
};

describe('StudentsListComponent', () => {
  let component: StudentsListComponent;
  let fixture: ComponentFixture<StudentsListComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        MatChipsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        NgxsModule.forRoot(
          [
            StudentsState,
            TeachersState,
            GradesState,
            SchoolsState,
            UsersState,
            AuthState,
          ],
          { developmentMode: true }
        ),
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [StudentsListComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(true),
            }),
          },
        },
        {
          provide: StudentsService,
          useValue: {
            deleteStudent: () => of(),
          },
        },
      ],
    }).overrideProvider(InteractivityChecker, {
      useValue: {
        isFocusable: () => true,
      },
    });

    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      students: StudentsStateMock,
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to register', () => {
    jest.spyOn(component, 'onRegisterClick');

    const registerButton = fixture.debugElement.query(
      By.css('#registerButton')
    );
    registerButton.nativeElement.click();

    fixture.detectChanges();
    expect(component.onRegisterClick).toHaveBeenCalled();
  });

  it('should go to edit', () => {
    jest.spyOn(component, 'editStudent');

    const editButton = fixture.debugElement.query(By.css('.students-list__edit'));
    editButton.nativeElement.click();

    fixture.detectChanges();
    expect(component.editStudent).toHaveBeenCalled();
  });

  it('should delete student', () => {
    jest.spyOn(component, 'deleteStudent');
    const deleteButton = fixture.debugElement.query(
      By.css('.students-list__delete')
    );
    deleteButton.nativeElement.click();

    fixture.detectChanges();
    expect(component.deleteStudent).toHaveBeenCalled();
  });
});

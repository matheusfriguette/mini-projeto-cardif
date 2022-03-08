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
import { GradesListComponent } from './grades-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { GradesService } from '../grades.service';

export const GradesStateMock = {
  data: [
    {
      id: 1,
      grade: 'test',
      password: 'test',
      role: 'admin',
    },
  ],
};

describe('GradesListComponent', () => {
  let component: GradesListComponent;
  let fixture: ComponentFixture<GradesListComponent>;
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
      declarations: [GradesListComponent],
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
          provide: GradesService,
          useValue: {
            deleteGrade: () => of(),
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
      grades: GradesStateMock,
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesListComponent);
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
    jest.spyOn(component, 'editGrade');

    const editButton = fixture.debugElement.query(By.css('.grades-list__edit'));
    editButton.nativeElement.click();

    fixture.detectChanges();
    expect(component.editGrade).toHaveBeenCalled();
  });

  it('should delete grade', () => {
    jest.spyOn(component, 'deleteGrade');
    const deleteButton = fixture.debugElement.query(
      By.css('.grades-list__delete')
    );
    deleteButton.nativeElement.click();

    fixture.detectChanges();
    expect(component.deleteGrade).toHaveBeenCalled();
  });
});

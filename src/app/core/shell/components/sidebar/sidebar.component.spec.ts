/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { NgxsModule, Store } from '@ngxs/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { CurrentSchoolState } from 'src/app/shared/stores/current-school/current-school.state';
import { GradesState } from 'src/app/shared/stores/grades/grades.state';
import { SchoolsState } from 'src/app/shared/stores/schools/schools.state';
import { StudentsState } from 'src/app/shared/stores/students/students.state';
import { TeachersState } from 'src/app/shared/stores/teachers/teachers.state';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatButtonModule,
        SharedModule,
        MatMenuModule,
        NgxsModule.forRoot([
          StudentsState,
          TeachersState,
          GradesState,
          SchoolsState,
          CurrentSchoolState,
        ]),
      ],
      declarations: [SidebarComponent],
    });

    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

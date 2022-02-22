import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'students',
        loadChildren: () =>
          import('../../modules/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
      {
        path: 'teachers',
        loadChildren: () =>
          import('../../modules/teachers/teachers.module').then(
            (m) => m.TeachersModule
          ),
      },
      {
        path: 'grades',
        loadChildren: () =>
          import('../../modules/grades/grades.module').then(
            (m) => m.GradesModule
          ),
      },
      {
        path: 'schools',
        loadChildren: () =>
          import('../../modules/schools/schools.module').then(
            (m) => m.SchoolsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}

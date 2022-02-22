import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./students-list/students-list.module').then(
        (m) => m.StudentsListModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./students-register/students-register.module').then(
        (m) => m.StudentsRegisterModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./students-register/students-register.module').then(
        (m) => m.StudentsRegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}

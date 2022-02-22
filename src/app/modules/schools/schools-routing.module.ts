import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./schools-list/schools-list.module').then(
        (m) => m.SchoolsListModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./schools-register/schools-register.module').then(
        (m) => m.SchoolsRegisterModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./schools-register/schools-register.module').then(
        (m) => m.SchoolsRegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolsRoutingModule {}

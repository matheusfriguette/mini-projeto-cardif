import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./teachers-list/teachers-list.module').then(
        (m) => m.TeachersListModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./teachers-register/teachers-register.module').then(
        (m) => m.TeachersRegisterModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./teachers-register/teachers-register.module').then(
        (m) => m.TeachersRegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}

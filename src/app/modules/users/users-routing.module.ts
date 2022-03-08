import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./users-list/users-list.module').then(
        (m) => m.UsersListModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./users-register/users-register.module').then(
        (m) => m.UsersRegisterModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./users-register/users-register.module').then(
        (m) => m.UsersRegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

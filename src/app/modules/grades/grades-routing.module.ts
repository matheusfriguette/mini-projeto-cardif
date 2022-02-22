import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./grades-list/grades-list.module').then(
        (m) => m.GradesListModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./grades-register/grades-register.module').then(
        (m) => m.GradesRegisterModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./grades-register/grades-register.module').then(
        (m) => m.GradesRegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradesRoutingModule {}

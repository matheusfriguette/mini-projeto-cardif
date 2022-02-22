import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersRegisterComponent } from './teachers-register.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRegisterRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolsRegisterComponent } from './schools-register.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolsRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolsRegisterRoutingModule {}

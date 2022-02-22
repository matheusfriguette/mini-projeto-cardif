import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsRegisterComponent } from './students-register.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRegisterRoutingModule {}

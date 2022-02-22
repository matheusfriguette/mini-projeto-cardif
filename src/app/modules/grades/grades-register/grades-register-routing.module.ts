import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradesRegisterComponent } from './grades-register.component';

const routes: Routes = [
  {
    path: '',
    component: GradesRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradesRegisterRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolsListComponent } from './schools-list.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolsListRoutingModule {}

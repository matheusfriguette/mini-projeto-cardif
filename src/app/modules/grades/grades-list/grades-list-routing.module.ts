import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradesListComponent } from './grades-list.component';

const routes: Routes = [
  {
    path: '',
    component: GradesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradesListRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/models/school';
import { CurrentSchool } from 'src/app/shared/stores/current-school/current-school.actions';
import { CurrentSchoolState } from 'src/app/shared/stores/current-school/current-school.state';
import { Schools } from 'src/app/shared/stores/schools/schools.actions';
import { SchoolsState } from 'src/app/shared/stores/schools/schools.state';
import { SidebarLinks } from './constants/sidebar-links.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Select(CurrentSchoolState.getCurrentSchool)
  currentSchool$!: Observable<School>;
  @Select(SchoolsState.getData)
  schools$!: Observable<School[]>;

  readonly sidebarLinks = SidebarLinks;

  constructor(private store: Store) {}

  ngOnInit() {
    this.getSchools();
  }

  getSchools() {
    this.store.dispatch(new Schools.List());
  }

  updateSchool(school: School) {
    this.store.dispatch(new CurrentSchool.Update(school));
  }
}

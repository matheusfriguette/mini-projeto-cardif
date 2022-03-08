import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/models/school';
import { User } from 'src/app/shared/models/user';
import { Auth } from 'src/app/shared/stores/auth/auth.actions';
import { AuthState } from 'src/app/shared/stores/auth/auth.state';
import { SchoolsState } from 'src/app/shared/stores/schools/schools.state';
import {
  AdminSidebarLinks,
  SidebarLinks,
} from './constants/sidebar-links.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Select(AuthState.getCurrentSchool)
  currentSchool$!: Observable<School>;
  @Select(SchoolsState.getData)
  schools$!: Observable<School[]>;

  user?: User;
  sidebarLinks = SidebarLinks;

  constructor(private store: Store, private router: Router) {
    this.user = this.store.selectSnapshot((state) => state.auth.user);

    if (this.user?.role === 'admin') {
      this.sidebarLinks = [...this.sidebarLinks, ...AdminSidebarLinks];
    }
  }

  updateSchool(school: School) {
    this.store.dispatch(new Auth.UpdateCurrentSchool(school));
  }

  logout() {
    this.store.dispatch(new Auth.Logout());
    this.router.navigate(['/login']);
  }
}

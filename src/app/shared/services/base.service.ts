import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  url = 'http://localhost:3000';

  constructor(protected store: Store) {}

  get currentSchoolId(): number {
    return this.store.selectSnapshot<number>(
      (state) => state.auth.currentSchool.id
    );
  }
}

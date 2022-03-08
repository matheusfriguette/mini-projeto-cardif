import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(protected router: Router, private store: Store) {}

  canActivate(): boolean {
    if (!this.store.selectSnapshot((state) => state.auth.user)) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, Observable, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(
    protected httpClient: HttpClient,
    protected override store: Store
  ) {
    super(store);
  }

  login(user: string, password: string): Observable<User> {
    return this.httpClient
      .get<User[]>(`${this.url}/users`, {
        params: {
          user,
          password,
        },
      })
      .pipe(
        map((res) => {
          if (res.length === 0) {
            throw new Error('Usuário ou senha incorreto');
          }

          return res[0];
        })
      );
  }
}

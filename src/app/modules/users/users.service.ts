import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(private httpClient: HttpClient, protected override store: Store) {
    super(store);
  }

  getUsers(): Observable<HttpResponse<User[]>> {
    return this.httpClient.get<User[]>(`${this.url}/users`, {
      observe: 'response',
    });
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/users/${id}`);
  }

  registerUser(user: User): Observable<void> {
    delete user.id;
    return this.httpClient.post<void>(`${this.url}/users`, user);
  }

  updateUser(user: User): Observable<void> {
    return this.httpClient.put<void>(
      `${this.url}/users/${user.id}`,
      user
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/users/${id}`);
  }
}

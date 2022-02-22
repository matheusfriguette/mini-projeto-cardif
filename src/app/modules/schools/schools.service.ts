import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/models/school';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class SchoolsService extends BaseService {
  constructor(private httpClient: HttpClient, protected override store: Store) {
    super(store);
  }

  getSchools(): Observable<HttpResponse<School[]>> {
    return this.httpClient.get<School[]>(`${this.url}/schools`, {
      observe: 'response',
    });
  }

  getSchool(id: number): Observable<School> {
    return this.httpClient.get<School>(`${this.url}/schools/${id}`);
  }

  registerSchool(school: School): Observable<void> {
    delete school.id;
    return this.httpClient.post<void>(`${this.url}/schools`, school);
  }

  updateSchool(school: School): Observable<void> {
    return this.httpClient.put<void>(
      `${this.url}/schools/${school.id}`,
      school
    );
  }

  deleteSchool(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/schools/${id}`);
  }
}

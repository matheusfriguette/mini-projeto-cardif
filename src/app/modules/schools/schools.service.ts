import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/models/school';

@Injectable({
  providedIn: 'root',
})
export class SchoolsService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

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

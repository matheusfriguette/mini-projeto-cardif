import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/shared/models/teacher';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class TeachersService extends BaseService {
  constructor(
    protected httpClient: HttpClient,
    protected override store: Store
  ) {
    super(store);
  }

  getTeachers(): Observable<HttpResponse<Teacher[]>> {
    return this.httpClient.get<Teacher[]>(
      `${this.url}/schools/${this.currentSchoolId}/teachers`,
      {
        observe: 'response',
      }
    );
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>(
      `${this.url}/teachers/${id}`
    );
  }

  registerTeacher(teacher: Teacher): Observable<void> {
    delete teacher.id;
    return this.httpClient.post<void>(
      `${this.url}/schools/${this.currentSchoolId}/teachers`,
      teacher
    );
  }

  updateTeacher(teacher: Teacher): Observable<void> {
    return this.httpClient.put<void>(
      `${this.url}/teachers/${teacher.id}`,
      teacher
    );
  }

  deleteTeacher(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.url}/teachers/${id}`
    );
  }
}

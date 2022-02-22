import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Grade } from 'src/app/shared/models/grade';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class GradesService extends BaseService {
  constructor(
    protected httpClient: HttpClient,
    protected override store: Store
  ) {
    super(store);
  }

  getGrades(): Observable<HttpResponse<Grade[]>> {
    return this.httpClient.get<Grade[]>(
      `${this.url}/schools/${this.currentSchoolId}/grades`,
      {
        observe: 'response',
      }
    );
  }

  getGrade(id: number): Observable<Grade> {
    return this.httpClient.get<Grade>(
      `${this.url}/schools/${this.currentSchoolId}/grades/${id}`
    );
  }

  registerGrade(grade: Grade): Observable<void> {
    delete grade.id;
    return this.httpClient.post<void>(
      `${this.url}/schools/${this.currentSchoolId}/grades`,
      grade
    );
  }

  updateGrade(grade: Grade): Observable<void> {
    return this.httpClient.put<void>(
      `${this.url}/schools/${this.currentSchoolId}/grades/${grade.id}`,
      grade
    );
  }

  deleteGrade(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.url}/schools/${this.currentSchoolId}/grades/${id}`
    );
  }
}

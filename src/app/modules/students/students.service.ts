import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/student';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends BaseService {
  constructor(
    protected httpClient: HttpClient,
    protected override store: Store
  ) {
    super(store);
  }

  getStudents(): Observable<HttpResponse<Student[]>> {
    return this.httpClient.get<Student[]>(`${this.url}/schools/${this.currentSchoolId}/students`, {
      observe: 'response',
    });
  }

  getStudent(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.url}/students/${id}`);
  }

  registerStudent(student: Student): Observable<void> {
    delete student.id;
    return this.httpClient.post<void>(`${this.url}/schools/${this.currentSchoolId}/students`, student);
  }

  updateStudent(student: Student): Observable<void> {
    return this.httpClient.put<void>(
      `${this.url}/students/${student.id}`,
      student
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/students/${id}`);
  }
}

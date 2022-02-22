import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { StudentsService } from 'src/app/modules/students/students.service';
import { Students } from './students.actions';
import { Student } from '../../models/student';
import { Injectable } from '@angular/core';

export interface StudentsStateModel {
  data: Student[];
  student?: Student;
}

@State<StudentsStateModel>({
  name: 'students',
  defaults: {
    data: [],
  },
})
@Injectable()
export class StudentsState {
  constructor(private studentsService: StudentsService) {}

  @Selector()
  static getData(state: StudentsStateModel) {
    return state.data;
  }

  @Action(Students.List)
  getStudents(context: StateContext<StudentsStateModel>) {
    return this.studentsService.getStudents().pipe(
      tap((res) => {
        const state = context.getState();
        context.setState({
          ...state,
          data: res.body || [],
        });
      })
    );
  }

  @Action(Students.GetOne)
  getStudent(
    context: StateContext<StudentsStateModel>,
    action: Students.GetOne
  ) {
    return this.studentsService.getStudent(action.id).pipe(
      tap((res) => {
        context.patchState({
          student: res,
        });
      })
    );
  }

  @Action(Students.Register)
  registerStudent(
    context: StateContext<StudentsStateModel>,
    action: Students.Register
  ) {
    return this.studentsService.registerStudent(action.student).pipe(
      tap(() => {
        const state = context.getState();
        context.patchState({
          data: [...state.data, action.student],
        });
      })
    );
  }

  @Action(Students.Update)
  updateStudent(
    context: StateContext<StudentsStateModel>,
    action: Students.Update
  ) {
    return this.studentsService.updateStudent(action.student).pipe(
      tap(() => {
        const state = context.getState();
        const studentsList = state.data;
        const studentIndex = studentsList.findIndex(
          (item) => item.id === action.student.id
        );
        studentsList[studentIndex] = action.student;

        context.setState({
          ...state,
          data: studentsList,
        });
      })
    );
  }

  @Action(Students.Delete)
  deleteStudent(
    context: StateContext<StudentsStateModel>,
    action: Students.Delete
  ) {
    return this.studentsService.deleteStudent(action.id).pipe(
      tap(() => {
        const state = context.getState();
        const filteredArray = state.data.filter(
          (item) => item.id !== action.id
        );
        context.setState({
          ...state,
          data: filteredArray,
        });
      })
    );
  }
}

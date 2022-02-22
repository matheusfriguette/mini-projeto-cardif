import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { TeachersService } from 'src/app/modules/teachers/teachers.service';
import { Teachers } from './teachers.actions';
import { Teacher } from '../../models/teacher';
import { Injectable } from '@angular/core';

export interface TeachersStateModel {
  data: Teacher[];
  teacher?: Teacher;
}

@State<TeachersStateModel>({
  name: 'teachers',
  defaults: {
    data: [],
  },
})
@Injectable()
export class TeachersState {
  constructor(private teachersService: TeachersService) {}

  @Selector()
  static getData(state: TeachersStateModel) {
    return state.data;
  }

  @Action(Teachers.List)
  getTeachers(context: StateContext<TeachersStateModel>) {
    return this.teachersService.getTeachers().pipe(
      tap((res) => {
        const state = context.getState();
        context.setState({
          ...state,
          data: res.body || [],
        });
      })
    );
  }

  @Action(Teachers.GetOne)
  getTeacher(
    context: StateContext<TeachersStateModel>,
    action: Teachers.GetOne
  ) {
    return this.teachersService.getTeacher(action.id).pipe(
      tap((res) => {
        context.patchState({
          teacher: res,
        });
      })
    );
  }

  @Action(Teachers.Register)
  registerTeacher(
    context: StateContext<TeachersStateModel>,
    action: Teachers.Register
  ) {
    return this.teachersService.registerTeacher(action.teacher).pipe(
      tap(() => {
        const state = context.getState();
        context.patchState({
          data: [...state.data, action.teacher],
        });
      })
    );
  }

  @Action(Teachers.Update)
  updateTeacher(
    context: StateContext<TeachersStateModel>,
    action: Teachers.Update
  ) {
    return this.teachersService.updateTeacher(action.teacher).pipe(
      tap(() => {
        const state = context.getState();
        const teachersList = state.data;
        const teacherIndex = teachersList.findIndex(
          (item) => item.id === action.teacher.id
        );
        teachersList[teacherIndex] = action.teacher;

        context.setState({
          ...state,
          data: teachersList,
        });
      })
    );
  }

  @Action(Teachers.Delete)
  deleteTeacher(
    context: StateContext<TeachersStateModel>,
    action: Teachers.Delete
  ) {
    return this.teachersService.deleteTeacher(action.id).pipe(
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

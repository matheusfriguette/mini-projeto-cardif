import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { GradesService } from 'src/app/modules/grades/grades.service';
import { Grades } from './grades.actions';
import { Grade } from '../../models/grade';
import { Injectable } from '@angular/core';

export interface GradesStateModel {
  data: Grade[];
  grade?: Grade;
}

@State<GradesStateModel>({
  name: 'grades',
  defaults: {
    data: [],
  },
})
@Injectable()
export class GradesState {
  constructor(private gradesService: GradesService) {}

  @Selector()
  static getData(state: GradesStateModel) {
    return state.data;
  }

  @Action(Grades.List)
  getGrades(context: StateContext<GradesStateModel>) {
    return this.gradesService.getGrades().pipe(
      tap((res) => {
        const state = context.getState();
        context.setState({
          ...state,
          data: res.body || [],
        });
      })
    );
  }

  @Action(Grades.GetOne)
  getGrade(
    context: StateContext<GradesStateModel>,
    action: Grades.GetOne
  ) {
    return this.gradesService.getGrade(action.id).pipe(
      tap((res) => {
        context.patchState({
          grade: res,
        });
      })
    );
  }

  @Action(Grades.Register)
  registerGrade(
    context: StateContext<GradesStateModel>,
    action: Grades.Register
  ) {
    return this.gradesService.registerGrade(action.grade).pipe(
      tap(() => {
        const state = context.getState();
        context.patchState({
          data: [...state.data, action.grade],
        });
      })
    );
  }

  @Action(Grades.Update)
  updateGrade(
    context: StateContext<GradesStateModel>,
    action: Grades.Update
  ) {
    return this.gradesService.updateGrade(action.grade).pipe(
      tap(() => {
        const state = context.getState();
        const gradesList = state.data;
        const gradeIndex = gradesList.findIndex(
          (item) => item.id === action.grade.id
        );
        gradesList[gradeIndex] = action.grade;

        context.setState({
          ...state,
          data: gradesList,
        });
      })
    );
  }

  @Action(Grades.Delete)
  deleteGrade(
    context: StateContext<GradesStateModel>,
    action: Grades.Delete
  ) {
    return this.gradesService.deleteGrade(action.id).pipe(
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

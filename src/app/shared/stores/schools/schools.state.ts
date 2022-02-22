import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SchoolsService } from 'src/app/modules/schools/schools.service';
import { Schools } from './schools.actions';
import { School } from '../../models/school';
import { Injectable } from '@angular/core';

export interface SchoolsStateModel {
  data: School[];
  school?: School;
}

@State<SchoolsStateModel>({
  name: 'schools',
  defaults: {
    data: [],
  },
})
@Injectable()
export class SchoolsState {
  constructor(private schoolsService: SchoolsService) {}

  @Selector()
  static getData(state: SchoolsStateModel) {
    return state.data;
  }

  @Action(Schools.List)
  getSchools(context: StateContext<SchoolsStateModel>) {
    return this.schoolsService.getSchools().pipe(
      tap((res) => {
        const state = context.getState();
        context.setState({
          ...state,
          data: res.body || [],
        });
      })
    );
  }

  @Action(Schools.GetOne)
  getSchool(context: StateContext<SchoolsStateModel>, action: Schools.GetOne) {
    return this.schoolsService.getSchool(action.id).pipe(
      tap((res) => {
        context.patchState({
          school: res,
        });
      })
    );
  }

  @Action(Schools.Register)
  registerSchool(
    context: StateContext<SchoolsStateModel>,
    action: Schools.Register
  ) {
    return this.schoolsService.registerSchool(action.school).pipe(
      tap(() => {
        const state = context.getState();
        context.patchState({
          data: [...state.data, action.school],
        });
      })
    );
  }

  @Action(Schools.Update)
  updateSchool(
    context: StateContext<SchoolsStateModel>,
    action: Schools.Update
  ) {
    return this.schoolsService.updateSchool(action.school).pipe(
      tap(() => {
        const state = context.getState();
        const schoolsList = state.data;
        const schoolIndex = schoolsList.findIndex(
          (item) => item.id === action.school.id
        );
        schoolsList[schoolIndex] = action.school;

        context.setState({
          ...state,
          data: schoolsList,
        });
      })
    );
  }

  @Action(Schools.Delete)
  deleteSchool(
    context: StateContext<SchoolsStateModel>,
    action: Schools.Delete
  ) {
    return this.schoolsService.deleteSchool(action.id).pipe(
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

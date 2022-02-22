import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CurrentSchool } from './current-school.actions';
import { Injectable } from '@angular/core';
import { School } from '../../models/school';

export interface CurrentSchoolStateModel {
  school?: School;
}

@State<CurrentSchoolStateModel>({
  name: 'currentSchool',
})
@Injectable()
export class CurrentSchoolState {
  @Selector()
  static getCurrentSchool(state: CurrentSchoolStateModel) {
    return state.school;
  }

  @Action(CurrentSchool.Update)
  updateSchool(
    context: StateContext<CurrentSchoolStateModel>,
    action: CurrentSchool.Update
  ) {
    context.setState({
      school: action.school,
    });
  }
}

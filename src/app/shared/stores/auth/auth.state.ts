import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Auth } from './auth.actions';
import { Injectable } from '@angular/core';
import { School } from '../../models/school';
import { User } from '../../models/user';

export interface AuthStateModel {
  user?: User;
  currentSchool?: School;
}

@State<AuthStateModel>({
  name: 'auth',
})
@Injectable()
export class AuthState {
  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static getCurrentSchool(state: AuthStateModel) {
    return state.currentSchool;
  }

  @Action(Auth.UpdateUser)
  update(context: StateContext<AuthStateModel>, action: Auth.UpdateUser) {
    context.patchState({
      user: action.user,
    });
  }

  @Action(Auth.UpdateCurrentSchool)
  updateCurrentSchool(
    context: StateContext<AuthStateModel>,
    action: Auth.UpdateCurrentSchool
  ) {
    context.patchState({
      currentSchool: action.school,
    });
  }

  @Action(Auth.Logout)
  logout(context: StateContext<AuthStateModel>) {
    context.patchState({
      user: undefined,
      currentSchool: undefined,
    });
  }
}

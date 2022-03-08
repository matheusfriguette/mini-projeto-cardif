import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { UsersService } from 'src/app/modules/users/users.service';
import { Users } from './users.actions';
import { User } from '../../models/user';
import { Injectable } from '@angular/core';

export interface UsersStateModel {
  data: User[];
  user?: User;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    data: [],
  },
})
@Injectable()
export class UsersState {
  constructor(private usersService: UsersService) {}

  @Selector()
  static getData(state: UsersStateModel) {
    return state.data;
  }

  @Action(Users.List)
  getUsers(context: StateContext<UsersStateModel>) {
    return this.usersService.getUsers().pipe(
      tap((res) => {
        const state = context.getState();
        context.setState({
          ...state,
          data: res.body || [],
        });
      })
    );
  }

  @Action(Users.GetOne)
  getUser(context: StateContext<UsersStateModel>, action: Users.GetOne) {
    return this.usersService.getUser(action.id).pipe(
      tap((res) => {
        context.patchState({
          user: res,
        });
      })
    );
  }

  @Action(Users.Register)
  registerUser(context: StateContext<UsersStateModel>, action: Users.Register) {
    return this.usersService.registerUser(action.user).pipe(
      tap(() => {
        const state = context.getState();
        context.patchState({
          data: [...state.data, action.user],
        });
      })
    );
  }

  @Action(Users.Update)
  updateUser(context: StateContext<UsersStateModel>, action: Users.Update) {
    return this.usersService.updateUser(action.user).pipe(
      tap(() => {
        const state = context.getState();
        const usersList = state.data;
        const userIndex = usersList.findIndex(
          (item) => item.id === action.user.id
        );
        usersList[userIndex] = action.user;

        context.setState({
          ...state,
          data: usersList,
        });
      })
    );
  }

  @Action(Users.Delete)
  deleteUser(context: StateContext<UsersStateModel>, action: Users.Delete) {
    return this.usersService.deleteUser(action.id).pipe(
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

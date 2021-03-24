import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/user';

import * as userActions from '../actions/user.actions';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: null,
};

// eslint-disable-next-line no-underscore-dangle
const _userReducer = createReducer(
  initialState,
  on(userActions.loadUserSuccess, (state, action) => ({
    ...state,
    user: {...action.user}
  })),
  on(userActions.logout, (state) => ({
    ...state,
    user: null
  }))
);

export const userReducer = (state: UserState, action: Action) => _userReducer(state, action);

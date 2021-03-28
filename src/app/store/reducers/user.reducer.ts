import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/user';

import * as userActions from '../actions/user.actions';
import { LanguageType } from '../../core/models/enums/language-type';

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
  })),
  on(userActions.changeLanguage, (state, action) => ({
    ...state,
    user: {...state.user, language: LanguageType[action.language.toLocaleUpperCase()]}
  })),
);

export const userReducer = (state: UserState, action: Action) => _userReducer(state, action);

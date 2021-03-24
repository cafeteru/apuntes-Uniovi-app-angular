import { createAction, props } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const loadUser = createAction('[Users] Load user', props<{ id: number }>());
export const loadUserSuccess = createAction('[Users] Load user success', props<UserState>());
export const logout = createAction('[Users] Load user logout');


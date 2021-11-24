import { ActionReducerMap } from '@ngrx/store';

import { loadingReducer, LoadingState } from './reducers/loading.reducer';
import { userReducer, UserState } from './reducers/user.reducer';

export interface AppState {
  loadingState: LoadingState;
  userState: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  loadingState: loadingReducer,
  userState: userReducer,
};

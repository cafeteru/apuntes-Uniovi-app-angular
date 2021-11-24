import { Action, createReducer, on } from '@ngrx/store';

import * as actions from '../actions/loading.actions';

export interface LoadingState {
  isLoading: boolean;
  loadedUser: boolean;
}

export const initialState: LoadingState = {
  isLoading: false,
  loadedUser: false,
};

// eslint-disable-next-line no-underscore-dangle
const _loadingReducer = createReducer(
  initialState,
  on(actions.initLoading, (state) => ({ ...state, isLoading: true })),
  on(actions.stopLoading, (state) => ({ ...state, isLoading: false })),
  on(actions.loadedUser, (state) => ({ ...state, loadedUser: true })),
  on(actions.clearUser, (state) => ({ ...state, loadedUser: false }))
);

export const loadingReducer = (state: LoadingState, action: Action) =>
  _loadingReducer(state, action);

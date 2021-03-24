import { createAction } from '@ngrx/store';

export const initLoading = createAction('[UI Component] initLoading');
export const stopLoading = createAction('[UI Component] stopLoading');
export const loadedUser = createAction('[UI Component] loadedUser');
export const clearUser = createAction('[UI Component] clearUser');

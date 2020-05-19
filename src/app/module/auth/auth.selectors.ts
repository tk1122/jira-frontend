import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authFeatureKey, AuthState} from "./auth.reducer";


const authState = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoggedIn = createSelector(authState, authState => authState.isLoggedIn);

export const user = createSelector(authState, authState => authState.user);

export const userToken = createSelector(user, user => user?.token);

export const userId = createSelector(user, user => {
  return user?.id
})


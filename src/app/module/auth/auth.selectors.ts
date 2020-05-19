import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authFeatureKey, AuthState} from "./auth.reducer";


const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoggedIn = createSelector(selectAuthState, authState => authState.isLoggedIn);

export const user = createSelector(selectAuthState, authState => authState.user);

export const userToken = createSelector(user, user => user?.accessToken);

export const userId = createSelector(user, user => {
  return user?.userId
})


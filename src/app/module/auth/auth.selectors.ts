import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authFeatureKey, AuthState} from "./auth.reducer";


const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsLoggedIn = createSelector(selectAuthState, authState => authState.isLoggedIn);

export const selectUser = createSelector(selectAuthState, authState => authState.user);

export const selectUserToken = createSelector(selectUser, user => user?.token);


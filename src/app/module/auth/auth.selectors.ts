import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authFeatureKey, AuthState} from "./auth.reducer";
import {roles} from "../user/user.selectors";


const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoggedIn = createSelector(selectAuthState, authState => authState.isLoggedIn);

export const user = createSelector(selectAuthState, authState => authState.user);

export const isAdmin = createSelector(user, user => user?.isAdmin);

export const userToken = createSelector(user, user => user?.accessToken);

export const userId = createSelector(user, user => {
  return user?.userId
});

// @ts-ignore
// tslint:disable-next-line:no-shadowed-variable
export const isPm = createSelector(user, roles, (user, roles) => user?.roles.includes(roles.find(r => r.name === 'pm')?.id));


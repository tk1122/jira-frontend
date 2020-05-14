import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authFeatureKey, AuthState} from "./auth.reducer";


const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

const selectIsLoggedIn = createSelector(selectAuthState, authState => authState.isLoggedIn);

const selectUser = createSelector(selectAuthState, authState => authState.user);

const selectUserToken = createSelector(selectUser, user => user?.token);

const selectUserId = createSelector(selectUser, user => {
  return user?.id
})

export const AuthSelectors = {selectIsLoggedIn, selectUser, selectUserToken, selectUserId}

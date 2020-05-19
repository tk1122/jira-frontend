import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authFeatureKey, AuthState} from "./auth.reducer";


const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

const selectIsLoggedIn = createSelector(selectAuthState, authState => authState.isLoggedIn);

const selectUser = createSelector(selectAuthState, authState => authState.user);

const selectUserToken = createSelector(selectUser, user => user?.accessToken);

const selectUserId = createSelector(selectUser, user => {
  return user?.userId
})

export const AuthSelectors = {selectIsLoggedIn, selectUser, selectUserToken, selectUserId}

import {createReducer, on} from '@ngrx/store';
import {AuthActions} from "./auth.actions";
import {AuthInfo} from "../../../shared/model/auth-info";


export const authFeatureKey = 'auth';

export interface AuthState {
  isLoggedIn: boolean,
  user?: AuthInfo
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
};

export const reducer = createReducer(
  initialAuthState,
  on(AuthActions.login, state => state),
  on(AuthActions.loginSuccess, (state, {user}) => ({isLoggedIn: true, user})),
  on(AuthActions.loginFailure, state => state),
  on(AuthActions.logout, state => ({isLoggedIn: false})),
);


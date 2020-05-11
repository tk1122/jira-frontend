import {createReducer, on} from '@ngrx/store';
import {AuthActions} from "./auth.actions";
import {User} from "../../../shared/model/user";


export const authFeatureKey = 'auth';

export interface AuthState {
  isLoggedIn: boolean,
  user?: User
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


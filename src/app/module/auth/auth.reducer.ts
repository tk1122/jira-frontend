import {createReducer, on} from '@ngrx/store';
import {AuthInfo} from "../../../shared/model/auth-info";
import {loginSuccess, logout} from "./auth.actions";


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
  on(loginSuccess, (state, {user}) => ({isLoggedIn: true, user})),
  on(logout, _ => ({isLoggedIn: false})),
);

import {createAction, props} from '@ngrx/store';
import {User} from "../../../shared/model/user";
import {ErrorMessage} from "../../../shared/model/error-message";


const login = createAction(
  '[Login Page] Login',
  props<{ username: string, password: string }>()
);

const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: User }>()
);

const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ message: ErrorMessage }>()
);

const logout = createAction(
  '[Header Component] Logout'
);

export const AuthActions = {login, loginSuccess, loginFailure, logout}

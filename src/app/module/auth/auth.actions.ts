import {createAction, props} from '@ngrx/store';
import {AuthInfo} from "../../../shared/model/auth-info";
import {ErrorMessage} from "../../../shared/model/error-message";
import {SuccessMessage} from "../../../shared/model/success-message";
import {User} from "../../../shared/model/user";


export const login = createAction(
  '[Login Page] Login',
  props<{ username: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: AuthInfo }>()
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ message: ErrorMessage }>()
);

export const signup = createAction(
  '[SignUp Page] SignUp',
  props<{ user: Partial<User> }>()
);

export const signUpSuccess = createAction(
  '[Auth API] SignUp Success',
  props<{ message: SuccessMessage }>()
);

export const signUpFailure = createAction(
  '[Auth API] SignUp Failure',
  props<{ message: ErrorMessage }>()
);

export const logout = createAction(
  '[Header Component] Logout'
);

export const unauthorizedAccess = createAction('[Auth Gaurd] Unauthorized Access')

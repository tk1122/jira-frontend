import {createAction, props} from '@ngrx/store';
import {AuthInfo} from "../../../shared/model/auth-info";
import {ErrorMessage} from "../../../shared/model/error-message";
import {SuccessMessage} from "../../../shared/model/success-message";
import {User} from "../../../shared/model/user";


const login = createAction(
  '[Login Page] Login',
  props<{ username: string, password: string }>()
);

const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: AuthInfo }>()
);

const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ message: ErrorMessage }>()
);

const signup = createAction(
  '[SignUp Page] SignUp',
  props<{ user: Partial<User> }>()
);

const signUpSuccess = createAction(
  '[Auth API] SignUp Success',
  props<{ message: SuccessMessage }>()
);

const signUpFailure = createAction(
  '[Auth API] SignUp Failure',
  props<{ message: ErrorMessage }>()
);

const logout = createAction(
  '[Header Component] Logout'
);

const unauthorizedAccess = createAction('[Auth Gaurd] Unauthorized Access')

export const AuthActions = {login, loginSuccess, loginFailure, signup, signUpSuccess, signUpFailure, logout, unauthorizedAccess}

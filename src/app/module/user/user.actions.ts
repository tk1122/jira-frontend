import {createAction, props} from "@ngrx/store";
import {User} from "../../../shared/model/user";
import {ErrorMessage} from "../../../shared/model/error-message";
import {Role} from "../../../shared/model/role";
import {Update} from "@ngrx/entity";

export const loadUsers = createAction(
  '[User Page] Load users',
  props<{}>()
)

export const loadUsersSuccess = createAction(
  '[User API] Load users success',
  props<{ users: User[] }>()
)

export const loadUserFailure = createAction(
  '[User API] Load user failure',
  props<{ error: ErrorMessage }>()
)

export const loadRoles = createAction(
  '[User Page] Load roles',
  props<{}>()
)

export const loadRolesSuccess = createAction(
  '[User API] Load roles success',
  props<{ roles: Role[] }>()
)

export const loadRolesFailure = createAction(
  '[User API] Load roles failure',
  props<{ error: ErrorMessage }>()
)

export const selectUser = createAction(
  '[User Page] Select user',
  props<{ id: number }>()
)

export const updateUser = createAction(
  '[User Info Page] Update user',
  props<{ user: Update<User> }>()
)

export const updateUserSuccess = createAction(
  '[User API] Update user success',
  props<{}>()
)

export const updateUserFailure = createAction(
  '[User API] Udate user failure',
  props<{ error: ErrorMessage }>()
)





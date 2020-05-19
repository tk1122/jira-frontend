import {createAction, props} from "@ngrx/store";
import {User} from "../../../shared/model/user";
import {SuccessMessage} from "../../../shared/model/success-message";

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
  props<{ message: SuccessMessage }>()
)

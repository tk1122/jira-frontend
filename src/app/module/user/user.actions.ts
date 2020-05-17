import {createAction, props} from "@ngrx/store";
import {User} from "../../../shared/model/user";
import {SuccessMessage} from "../../../shared/model/success-message";

const loadUsers = createAction(
  '[User Page] Load users',
  props<{}>()
)

const loadUsersSuccess = createAction(
  '[User API] Load users success',
  props<{ users: User[] }>()
)

const loadUserFailure = createAction(
  '[User API] Load user failure',
  props<{ message: SuccessMessage }>()
)

export const UserActions = {
  loadUsers,
  loadUsersSuccess,
  loadUserFailure
}

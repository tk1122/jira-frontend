import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {User} from "../../../shared/model/user";
import {loadRolesSuccess, loadUsersSuccess, selectUser, updateUser} from "./user.actions";
import {Role} from "../../../shared/model/role";
import {logout} from "../auth/auth.actions";


export const userFeatureKey = 'user';
export const roleFeatureKey = 'role'

export interface RoleState extends EntityState<Role> {
  isRolesLoaded: boolean
}

export interface UserState extends EntityState<User> {
  isUsersLoaded: boolean,
  selectedUserId?: number
}

export const roleEntityAdapter = createEntityAdapter<Role>();

export const userEntityAdapter = createEntityAdapter<User>();

export const userInitialState: UserState = userEntityAdapter.getInitialState({
  isUsersLoaded: false,
  selectedUserId: undefined
})

export const roleInitialState: RoleState = roleEntityAdapter.getInitialState({isRolesLoaded: false})

export const userReducer = createReducer(
  userInitialState,
  on(loadUsersSuccess, (state, {users}) => userEntityAdapter.setAll(users, {
    ...state,
    isUsersLoaded: true
  })),
  on(selectUser, (state, {id}) => ({...state, selectedUserId: id})),
  on(updateUser, (state, {user}) => userEntityAdapter.updateOne(user, state)),
  on(logout, state => userEntityAdapter.removeAll({...state, selectedUserId: undefined, isUsersLoaded: false}))
);

export const roleReducer = createReducer(
  roleInitialState,
  on(loadRolesSuccess, (state, {roles}) => roleEntityAdapter.setAll(roles, {
    ...state,
    isRolesLoaded: true
  })),
  on(logout, state => roleEntityAdapter.removeAll({...state, isRolesLoaded: false}))
)


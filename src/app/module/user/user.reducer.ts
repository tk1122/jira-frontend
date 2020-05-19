import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {User} from "../../../shared/model/user";
import {loadRolesSuccess, loadUsersSuccess, updateUser} from "./user.actions";
import {Role} from "../../../shared/model/role";


export const userFeatureKey = 'user';
export const roleFeatureKey = 'role'

export interface RoleState extends EntityState<Role> {
  isRolesLoaded: boolean
}

export interface UserState extends EntityState<User> {
  isUsersLoaded: boolean
}

export const roleEntityAdapter = createEntityAdapter<Role>();

export const userEntityAdapter = createEntityAdapter<User>();

export const userInitialState: UserState = userEntityAdapter.getInitialState({isUsersLoaded: false})

export const roleInitialState: RoleState = roleEntityAdapter.getInitialState({isRolesLoaded: false})

export const userReducer = createReducer(
  userInitialState,
  on(loadUsersSuccess, (state, {users}) => userEntityAdapter.setAll(users, {
    ...state,
    isUsersLoaded: true
  })),
  on(updateUser, (state, {user}) => userEntityAdapter.updateOne(user, state))
);

export const roleReducer = createReducer(
  roleInitialState,
  on(loadRolesSuccess, (state, {roles}) => roleEntityAdapter.setAll(roles, {
    ...state,
    isRolesLoaded: true
  })),
)


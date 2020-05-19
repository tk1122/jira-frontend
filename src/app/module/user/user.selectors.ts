import {createFeatureSelector, createSelector} from "@ngrx/store";
import {
  roleEntityAdapter,
  roleFeatureKey,
  RoleState,
  userEntityAdapter,
  userFeatureKey,
  UserState
} from "./user.reducer";

const selectUserState = createFeatureSelector<UserState>(userFeatureKey)

const selectRoleState = createFeatureSelector<RoleState>(roleFeatureKey)

export const users = createSelector(selectUserState, userEntityAdapter.getSelectors().selectAll)

export const isUsersLoaded = createSelector(selectUserState, s1 => s1.isUsersLoaded)

export const roles = createSelector(selectRoleState, roleEntityAdapter.getSelectors().selectAll)

export const isRolesLoaded = createSelector(selectRoleState, s1 => s1.isRolesLoaded)

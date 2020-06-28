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

export const user = createSelector(selectUserState, (s1: UserState, props: { id: number }) => s1.entities[props.id])

export const selectedUserId = createSelector(selectUserState, s1 => s1.selectedUserId)

export const selectedUser = createSelector(selectUserState, s1 => s1.entities[s1.selectedUserId ?? 0])

export const selectedUserRoles = createSelector(users, roles, selectedUserId, (users, roles, selectedUserId) => {
  const roleIds = users.find(u => u.id === selectedUserId)?.roleIds;

  const a = roles.filter(r => roleIds?.includes(r.id))

  console.log(a);

  return a;
});

// tslint:disable-next-line:no-shadowed-variable
export const leaderRole = createSelector(roles, roles => roles.find(r => r.name === 'leader'));

// tslint:disable-next-line:no-shadowed-variable
export const memberRole = createSelector(roles, roles => roles.find(r => r.name === 'member'));

// tslint:disable-next-line:no-shadowed-variable
export const leaders = createSelector(users, leaderRole, (users, leaderRole) => users.filter(u => u.roleIds.includes(leaderRole?.id || 0)));

// tslint:disable-next-line:no-shadowed-variable
export const members = createSelector(users, memberRole, (users, memberRole) => users.filter(u => u.roleIds.includes(memberRole?.id || 0)));


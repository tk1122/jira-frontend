import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {User} from "../../../shared/model/user";
import {loadUsersSuccess} from "./user.actions";


export const userFeatureKey = 'user';

export interface UserState extends EntityState<User> {
  isUsersLoaded: boolean
}

export const userEntityAdapter = createEntityAdapter<User>();

export const initialState: UserState = userEntityAdapter.getInitialState({isUsersLoaded: false})


export const reducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, {users}) => userEntityAdapter.setAll(users, {
    ...state,
    isUsersLoaded: true
  })),
);


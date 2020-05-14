import {createFeatureSelector, createSelector} from "@ngrx/store";
import {userEntityAdapter, userFeatureKey, UserState} from "./user.reducer";

const selectUserState = createFeatureSelector<UserState>(userFeatureKey)

const selectAllUsers = createSelector(selectUserState, userEntityAdapter.getSelectors().selectAll)


import {createFeatureSelector, createSelector} from "@ngrx/store";
import {sprintEntityAdapter, sprintFeatureKey, SprintState} from "./sprint.reducer";

const selectSprintState = createFeatureSelector<SprintState>(sprintFeatureKey);

export const sprints = createSelector(selectSprintState, sprintEntityAdapter.getSelectors().selectAll)

export const isSprintsLoaded = createSelector(selectSprintState, s1 => s1.isSprintsLoaded)


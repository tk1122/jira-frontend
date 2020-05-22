import {createFeatureSelector, createSelector} from "@ngrx/store";
import {epicEntityAdapter, epicFeatureKey, epicState} from "./epic.reducer";

const selectepicState = createFeatureSelector<epicState>(epicFeatureKey);

export const epics = createSelector(selectepicState, epicEntityAdapter.getSelectors().selectAll)

export const isEpicsLoaded = createSelector(selectepicState, epicState => epicState.isEpicsLoaded)


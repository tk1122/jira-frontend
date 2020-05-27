import {createFeatureSelector, createSelector} from "@ngrx/store";
import {epicEntityAdapter, epicFeatureKey, epicState} from "./epic.reducer";
import {projectIssue} from "../issue/issue.selectors";

const selectepicState = createFeatureSelector<epicState>(epicFeatureKey);

export const epics = createSelector(selectepicState, epicEntityAdapter.getSelectors().selectAll)

export const isEpicsLoaded = createSelector(selectepicState, epicState => epicState.isEpicsLoaded)

export const epic =  createSelector(epics, projectIssue, (epics, issues) => {
  const result = epics.map(epic => {
    return {
      ...epic,
      issues: issues.filter(x => x.epicId === epic.id)
    }
  })
  console.log(result)
  return result
})

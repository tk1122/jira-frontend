import {createFeatureSelector, createSelector} from "@ngrx/store";
import {epicEntityAdapter, epicFeatureKey, epicState} from "./epic.reducer";
import {projectIssue} from "../issue/issue.selectors";

const selectEpicState = createFeatureSelector<epicState>(epicFeatureKey);

export const epics = createSelector(selectEpicState, epicEntityAdapter.getSelectors().selectAll)

export const isEpicsLoaded = createSelector(selectEpicState, epicState => epicState.isEpicsLoaded)

export const selectedProjectId = createSelector(selectEpicState, epicState => epicState.selectedProjectId)

export const epic =  createSelector(epics, projectIssue, (epics, issues) => {
  const result = epics.map(epic => {
    return {
      ...epic,
      expand: false,
      key: epic.id,
      timeLeft:  Number((((new Date(epic.endDate).getTime() - new Date().getTime()) /(new Date(epic.endDate).getTime() - new Date(epic.startDate).getTime())) * 100).toFixed(0)),
      issues: issues.filter(x => x.epicId === epic.id)
    }
  })
  console.log(result)
  return result
})

import {createFeatureSelector, createSelector} from "@ngrx/store";
import {sprintEntityAdapter, sprintFeatureKey, SprintState} from "./sprint.reducer";
import {projectIssue} from "../issue/issue.selectors";
import {Issue} from "../../../shared/model/issue";

const selectSprintState = createFeatureSelector<SprintState>(sprintFeatureKey);

export const sprints = createSelector(selectSprintState, sprintEntityAdapter.getSelectors().selectAll)

export const isSprintsLoaded = createSelector(selectSprintState, s1 => s1.isSprintsLoaded)

export const selectedProjectId = createSelector(selectSprintState, sprintState => sprintState.selectedProjectId)

export const sprint = createSelector(sprints, projectIssue, (sprints, issues) => {
  const result = sprints.map(sprint => {
    return {
      ...sprint,
      issues: issues.filter(issue => issue.sprintId === sprint.id).concat({"sprintId": sprint.id} as unknown as Issue)
    }
  })
  let backlog = {
    name: 'backlog',
    issues: issues.filter(issue => issue.sprintId === null).concat({"sprintId": null} as unknown as Issue)
  }
  console.log(result)

  // @ts-ignore
  return result.concat(backlog)
})

export const backlogs = createSelector(projectIssue, (issues) => {
  return issues.filter(issue => issue.sprintId !== null)
})

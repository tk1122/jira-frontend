import {createFeatureSelector, createSelector} from "@ngrx/store";
import {sprintEntityAdapter, sprintFeatureKey, SprintState} from "./sprint.reducer";
import {projectIssue} from "../issue/issue.selectors";
import {Issue, IssueStatus} from "../../../shared/model/issue";
import {SprintStatus} from "../../../shared/model/sprint";

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

export const sprintBoards = createSelector(sprints, projectIssue, (sprints, issues) => {
  const result = sprints.filter(sprint => sprint.status === SprintStatus.InProgress).map(sprint => {
    return {
      ...sprint,
      todoIssues: issues.filter(issue => (issue.sprintId === sprint.id && issue.status === 0)).concat({"status": IssueStatus.Todo} as unknown as Issue),
      doingIssues: issues.filter(issue => (issue.sprintId === sprint.id && issue.status === 1)).concat({"status": IssueStatus.Doing} as unknown as Issue),
      testingIssues: issues.filter(issue => (issue.sprintId === sprint.id && issue.status === 2)).concat({"status": IssueStatus.Testing} as unknown as Issue),
      doneIssues: issues.filter(issue => (issue.sprintId === sprint.id && issue.status === 3)).concat({"status": IssueStatus.Done} as unknown as Issue)
    }
  })
  console.log(result)
  return result
})

import {createFeatureSelector, createSelector} from "@ngrx/store";
import {
  issueEntityAdapter,
  issueFeatureKey,
  IssueState,
  projectIssueEntityAdapter,
  projectIssueFeatureKey,
  ProjectIssueState
} from "./issue.reducer";
import {IssueStatus} from "../../../shared/model/issue";

export const issueState = createFeatureSelector<IssueState>(issueFeatureKey);
export const projectIssueState = createFeatureSelector<ProjectIssueState>(projectIssueFeatureKey);

export const issues = createSelector(
  issueState,
  issueEntityAdapter.getSelectors().selectAll
)

export const todoIssues = createSelector(
  issues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Todo)
  }
)

export const doingIssues = createSelector(
  issues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Doing)
  }
)

export const testingIssues = createSelector(
  issues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Testing)
  }
)

export const doneIssues = createSelector(
  issues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Done)
  }
)

export const isIssuesLoaded = createSelector(
  issueState,
  issueState => issueState.isIssuesLoaded
)

export const isProjectIssuesLoaded = createSelector(
  projectIssueState,
  projectIssueState => projectIssueState.isProjectIssuesLoaded
)

export const projectIssue = createSelector(projectIssueState, projectIssueEntityAdapter.getSelectors().selectAll)

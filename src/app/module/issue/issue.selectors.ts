import {createFeatureSelector, createSelector} from "@ngrx/store";
import {issueEntityAdapter, issueFeatureKey, IssueState} from "./issue.reducer";
import {IssueStatus} from "../../../shared/model/issue";

export const issueState = createFeatureSelector<IssueState>(issueFeatureKey);

export const issues = createSelector(
  issueState,
  issueEntityAdapter.getSelectors().selectAll
)

export const finishedIssues = createSelector(
  issues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Finished)
  }
)

export const todoIssues = createSelector(
  issues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Todo)
  }
)

export const inProgressIssues = createSelector(
  issues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.InProgress)
  }
)

export const checkingIssues = createSelector(
  issues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Checking)
  }
)

export const reopenedIssues = createSelector(
  issues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Reopened)
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
  issueState => issueState.isAllIssuesLoaded
)

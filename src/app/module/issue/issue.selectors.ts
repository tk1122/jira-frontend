import {createFeatureSelector, createSelector} from "@ngrx/store";
import {issueEntityAdapter, issueFeatureKey, IssueState} from "./issue.reducer";
import {IssueStatus} from "../../../shared/model/issue";

const selectIssueState = createFeatureSelector<IssueState>(issueFeatureKey);

const selectAllIssues = createSelector(
  selectIssueState,
  issueEntityAdapter.getSelectors().selectAll
)

const selectAllFinishedIssues = createSelector(
  selectAllIssues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Finished)
  }
)

const selectAllInProgressIssues = createSelector(
  selectAllIssues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.InProgress)
  }
)

const selectAllCheckingIssues = createSelector(
  selectAllIssues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Checking)
  }
)

const selectAllReopenedIssues = createSelector(
  selectAllIssues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Reopened)
  }
)

 const selectAllDoneIssues = createSelector(
  selectAllIssues,
  issues => {
    return issues.filter(i => i.status === IssueStatus.Done)
  }
)

const selectIsAllIssuesLoaded = createSelector(
  selectIssueState,
  issueState => issueState.isAllIssuesLoaded
)

export const IssueSelectors = {
  selectAllIssues,
  selectAllCheckingIssues,
  selectAllDoneIssues,
  selectAllFinishedIssues,
  selectAllReopenedIssues,
  selectAllInProgressIssues,
  selectIsAllIssuesLoaded
}

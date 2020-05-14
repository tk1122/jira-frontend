import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Issue} from "../../../shared/model/issue";
import {IssueActions} from "./issue.actions";


export const issueFeatureKey = 'issues';

export interface IssueState extends EntityState<Issue> {
  isAllIssuesLoaded: boolean
}

export const issueEntityAdapter = createEntityAdapter<Issue>()

export const initialIssueState: IssueState = issueEntityAdapter.getInitialState({isAllIssuesLoaded: false})

export const reducer = createReducer(
  initialIssueState,
  on(IssueActions.loadIssues, state => state),
  on(IssueActions.loadIssuesSuccess, (state, {issues}) => issueEntityAdapter.setAll(issues, {...state, allIssuesLoaded: true})),
  on(IssueActions.loadIssuesFailure, state => state)
);


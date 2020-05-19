import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Issue} from "../../../shared/model/issue";
import {loadIssuesSuccess} from "./issue.actions";
import {logout} from "../auth/auth.actions";


export const issueFeatureKey = 'issues';

export interface IssueState extends EntityState<Issue> {
  isAllIssuesLoaded: boolean
}

export const issueEntityAdapter = createEntityAdapter<Issue>()

export const initialIssueState: IssueState = issueEntityAdapter.getInitialState({isAllIssuesLoaded: false})

export const reducer = createReducer(
  initialIssueState,
  on(loadIssuesSuccess, (state, {issues}) => issueEntityAdapter.setAll(issues, {...state, isAllIssuesLoaded: true})),
  on(logout, (state) => issueEntityAdapter.removeAll({...state, isAllIssuesLoaded: false}))
);


import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Issue} from "../../../shared/model/issue";
import {loadIssuesByProjectIdSuccess, loadIssuesSuccess} from "./issue.actions";
import {logout} from "../auth/auth.actions";


export const issueFeatureKey = 'issues';
export const projectIssueFeatureKey = 'projectIssues'

export interface IssueState extends EntityState<Issue> {
  isAllIssuesLoaded: boolean,
  projectIssues?: Issue[]
}

export interface ProjectIssueState extends EntityState<Issue> {
  isProjectIssuesLoaded: boolean,
}

export const issueEntityAdapter = createEntityAdapter<Issue>()
export const projectIssueEntityAdapter = createEntityAdapter<Issue>()

export const initialIssueState: IssueState = issueEntityAdapter.getInitialState({isAllIssuesLoaded: false, projectIssues: undefined})

export const initialProjectIssueState: ProjectIssueState = projectIssueEntityAdapter.getInitialState({isProjectIssuesLoaded: false})

export const issueReducer = createReducer(
  initialIssueState,
  on(loadIssuesSuccess, (state, {issues}) => issueEntityAdapter.setAll(issues, {...state, isAllIssuesLoaded: true})),
  on(logout, (state) => issueEntityAdapter.removeAll({...state, isAllIssuesLoaded: false}))
);

export const projectIssueReducer = createReducer(
  initialProjectIssueState,
  on(loadIssuesByProjectIdSuccess, (state, {issues}) => projectIssueEntityAdapter.setAll(issues, {...state, isProjectIssuesLoaded: true})),
  on(logout, (state) => issueEntityAdapter.removeAll({...state, isAllIssuesLoaded: false}))
);


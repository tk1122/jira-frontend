import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Issue} from "../../../shared/model/issue";
import {loadIssuesByProjectIdSuccess, loadIssuesSuccess} from "./issue.actions";
import {logout} from "../auth/auth.actions";
import {addIssueToSprint, addIssueToSprintSuccess} from "../sprint/sprint.actions";


export const issueFeatureKey = 'issues';
export const projectIssueFeatureKey = 'projectIssues'

export interface IssueState extends EntityState<Issue> {
  isIssuesLoaded: boolean,
}

export interface ProjectIssueState extends EntityState<Issue> {
  isProjectIssuesLoaded: boolean,
}

export const issueEntityAdapter = createEntityAdapter<Issue>()
export const projectIssueEntityAdapter = createEntityAdapter<Issue>()

export const initialIssueState: IssueState = issueEntityAdapter.getInitialState({
  isIssuesLoaded: false,
})

export const initialProjectIssueState: ProjectIssueState = projectIssueEntityAdapter.getInitialState({isProjectIssuesLoaded: false})

export const issueReducer = createReducer(
  initialIssueState,
  on(loadIssuesSuccess, (state, {issues}) => issueEntityAdapter.setAll(issues, {...state, isIssuesLoaded: true})),
  on(addIssueToSprint, (state, {issue}) => issueEntityAdapter.updateOne(issue, state)),
  on(logout, (state) => issueEntityAdapter.removeAll({...state, isIssuesLoaded: false}))
);

export const projectIssueReducer = createReducer(
  initialProjectIssueState,
  on(loadIssuesByProjectIdSuccess, (state, {issues}) => projectIssueEntityAdapter.setAll(issues, {
    ...state,
    isProjectIssuesLoaded: true
  })),
  on(addIssueToSprint, (state, {issue}) => projectIssueEntityAdapter.updateOne(issue, state)),
  on(logout, (state) => projectIssueEntityAdapter.removeAll({...state, isProjectIssuesLoaded: false}))
);


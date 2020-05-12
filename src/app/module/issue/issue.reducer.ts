import {createReducer} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Issue} from "../../../shared/model/issue";


export const issueFeatureKey = 'issues';

export interface IssueState extends EntityState<Issue> {
  allIssuesLoaded: boolean
}

const adapter = createEntityAdapter<Issue>()

export const initialIssueState: IssueState = adapter.getInitialState({allIssuesLoaded: false})

export const reducer = createReducer(
  initialIssueState,
);


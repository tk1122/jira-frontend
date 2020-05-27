import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Epic} from "../../../shared/model/epic";
import {loadEpicsSuccess, selectEpic, selectProject} from './epic.actions'
import {logout} from "../auth/auth.actions";
import {Issue} from "../../../shared/model/issue";
import {loadIssuesByProjectIdSuccess} from "../issue/issue.actions";


export const epicFeatureKey = 'epic';

export interface epicState extends EntityState<Epic> {
  isEpicsLoaded: boolean,
  selectedProjectId?: number
  selectedEpicId?:number
}

export const epicEntityAdapter = createEntityAdapter<Epic>();

const initialState: epicState = epicEntityAdapter.getInitialState({isEpicsLoaded: false, selectedProjectId: undefined, selectedEpicId: undefined})

export const reducer = createReducer(
  initialState,
  on(loadEpicsSuccess, (state, {epics}) => epicEntityAdapter.setAll(epics, {
    ...state,
    isEpicsLoaded: true
  })),
  on(selectEpic, (state, {id}) => ({...state, selectedEpicId: id})),
  on(selectProject, (state, {id}) => ({...state, selectedProjectId: id})),
  on(logout, state => epicEntityAdapter.removeAll({...state, isEpicsLoaded: false})),
  // on(createEpic, (state, {Epic}) => EpicEntityAdapter.addOne(Epic, state)),
  // on(updateEpic, (state, {Epic}) => EpicEntityAdapter.updateOne(Epic, state)),
  )
;

export const projectIssueFeatureKey = 'projectIssues'

export interface ProjectIssueState extends EntityState<Issue> {
  isProjectIssuesLoaded: boolean,
}
export const projectIssueEntityAdapter = createEntityAdapter<Issue>()

export const initialProjectIssueState: ProjectIssueState = projectIssueEntityAdapter.getInitialState({isProjectIssuesLoaded: false})

export const projectIssueReducer = createReducer(
  initialProjectIssueState,
  on(loadIssuesByProjectIdSuccess, (state, {issues}) => projectIssueEntityAdapter.setAll(issues, {...state, isProjectIssuesLoaded: true})),
  on(logout, (state) => projectIssueEntityAdapter.removeAll({...state, isAllIssuesLoaded: false}))
);


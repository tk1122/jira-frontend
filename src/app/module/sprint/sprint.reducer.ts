import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Sprint} from "../../../shared/model/sprint";
import {addIssueToSprintSuccess, loadSprintsSuccess, updateActiveSprint} from "./sprint.actions";
import {issueEntityAdapter} from "../issue/issue.reducer";
import {selectProject} from "../epic/epic.actions";


export const sprintFeatureKey = 'sprint';

export interface SprintState extends EntityState<Sprint> {
  isSprintsLoaded: boolean,
  selectedProjectId?: number
}

export const sprintEntityAdapter = createEntityAdapter<Sprint>();

const initialState: SprintState = sprintEntityAdapter.getInitialState({
  isSprintsLoaded: false,
  selectedProjectId: undefined
})

export const reducer = createReducer(
  initialState,
  on(loadSprintsSuccess, (state, {sprints}) => sprintEntityAdapter.setAll(sprints, {
    ...state,
    isSprintsLoaded: true
  })),
  on(selectProject, (state, {id}) => ({...state, selectedProjectId: id})),
  on(updateActiveSprint, (state, {sprint}) => sprintEntityAdapter.updateOne(sprint, state))
  )
;


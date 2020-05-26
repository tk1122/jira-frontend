import {createReducer} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Sprint} from "../../../shared/model/sprint";


export const sprintFeatureKey = 'sprint';

export interface SprintState extends EntityState<Sprint> {
  isSprintsLoaded: boolean
}

export const sprintEntityAdapter = createEntityAdapter<Sprint>();

const initialState: SprintState = sprintEntityAdapter.getInitialState({isSprintsLoaded: false})

export const reducer = createReducer(
  initialState
  )
;


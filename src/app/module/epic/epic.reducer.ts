import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Epic} from "../../../shared/model/epic";
import {loadEpicsSuccess} from './epic.actions'
import {logout} from "../auth/auth.actions";


export const epicFeatureKey = 'epic';

export interface epicState extends EntityState<Epic> {
  isEpicsLoaded: boolean
}

export const epicEntityAdapter = createEntityAdapter<Epic>();

const initialState: epicState = epicEntityAdapter.getInitialState({isEpicsLoaded: false})

export const reducer = createReducer(
  initialState,
  on(loadEpicsSuccess, (state, {epics}) => epicEntityAdapter.setAll(epics, {
    ...state,
    isEpicsLoaded: true
  })),
  on(logout, state => epicEntityAdapter.removeAll({...state, isEpicsLoaded: false})),
  // on(createEpic, (state, {Epic}) => EpicEntityAdapter.addOne(Epic, state)),
  // on(updateEpic, (state, {Epic}) => EpicEntityAdapter.updateOne(Epic, state)),
  )
;


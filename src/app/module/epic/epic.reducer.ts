import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Epic} from "../../../shared/model/epic";
import {createEpic, loadEpicsSuccess, selectEpic, selectProject} from './epic.actions'
import {logout} from "../auth/auth.actions";


export const epicFeatureKey = 'epic';

export interface epicState extends EntityState<Epic> {
  isEpicsLoaded: boolean,
  selectedProjectId?: number
  selectedEpicId?: number
}

export const epicEntityAdapter = createEntityAdapter<Epic>();

const initialState: epicState = epicEntityAdapter.getInitialState({
  isEpicsLoaded: false,
  selectedProjectId: undefined,
  selectedEpicId: undefined
})

export const reducer = createReducer(
  initialState,
  on(loadEpicsSuccess, (state, {epics}) => epicEntityAdapter.setAll(epics, {
    ...state,
    isEpicsLoaded: true
  })),
  on(selectEpic, (state, {id}) => ({...state, selectedEpicId: id})),
  on(selectProject, (state, {id}) => ({...state, selectedProjectId: id})),
  on(logout, state => epicEntityAdapter.removeAll({
    ...state,
    isEpicsLoaded: false,
    selectedEpicId: undefined,
    selectedProjectId: undefined
  })),
  on(createEpic, (state, {epic}) => epicEntityAdapter.addOne(epic, state)),
  // on(updateEpic, (state, {Epic}) => EpicEntityAdapter.updateOne(Epic, state)),
)



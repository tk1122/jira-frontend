import {createReducer} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Project} from "../../../shared/model/project";


export const projectFeatureKey = 'project';

export interface ProjectState extends EntityState<Project> {
  isProjectsLoaded: boolean
}

export const projectEntityAdapter = createEntityAdapter<Project>();

const initialState: ProjectState = projectEntityAdapter.getInitialState({isProjectsLoaded: false})


export const reducer = createReducer(
  initialState,
);


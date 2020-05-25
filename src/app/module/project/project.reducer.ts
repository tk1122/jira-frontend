import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Project} from "../../../shared/model/project";
import {createProject, loadProjectsSuccess, selectProject, updateProject} from "./project.actions";
import {logout} from "../auth/auth.actions";


export const projectFeatureKey = 'project';

export interface ProjectState extends EntityState<Project> {
  isProjectsLoaded: boolean,
  selectedProjectId?: number
}

export const projectEntityAdapter = createEntityAdapter<Project>();

const initialState: ProjectState = projectEntityAdapter.getInitialState({isProjectsLoaded: false, selectedProjectId: undefined})

export const reducer = createReducer(
  initialState,
  on(loadProjectsSuccess, (state, {projects}) => projectEntityAdapter.setAll(projects, {
    ...state,
    isProjectsLoaded: true
  })),
  on(selectProject, (state, {id}) => ({...state, selectedProjectId: id})),
  on(logout, state => projectEntityAdapter.removeAll({...state, isProjectsLoaded: false})),
  on(createProject, (state, {project}) => projectEntityAdapter.addOne(project, state)),
  on(updateProject, (state, {project}) => projectEntityAdapter.updateOne(project, state)),
  )
;


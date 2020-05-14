import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Project} from "../../../shared/model/project";
import {ProjectActions} from "./project.actions";


export const projectFeatureKey = 'project';

export interface ProjectState extends EntityState<Project> {
  isProjectsLoaded: boolean
}

export const projectEntityAdapter = createEntityAdapter<Project>();

const initialState: ProjectState = projectEntityAdapter.getInitialState({isProjectsLoaded: false})


export const reducer = createReducer(
  initialState,
  on(ProjectActions.loadProjects, state => state),
  on(ProjectActions.loadProjectsSuccess, (state, {projects}) => projectEntityAdapter.setAll(projects, {
    ...state,
    isProjectsLoaded: true
  })),
  on(ProjectActions.loadProjectFailure, state => state),
  on(ProjectActions.createProject, (state, {project}) => projectEntityAdapter.addOne(project, state)),
  on(ProjectActions.createProjectSuccess, state => state),
  on(ProjectActions.updateProject, (state, {project}) => projectEntityAdapter.updateOne(project, state)),
  on(ProjectActions.updateProjectSuccess, state => state)
);


import {createAction, props} from "@ngrx/store";
import {Project} from "../../../shared/model/project";
import {ErrorMessage} from "../../../shared/model/error-message";
import {Update} from "@ngrx/entity";

export const loadProjects = createAction(
  '[Project Page] Load projects',
  props<{ userId: number }>()
)

export const loadProjectsSuccess = createAction(
  '[Project API] Load projects success',
  props<{ projects: Project[] }>()
)

export const loadProjectFailure = createAction(
  '[Project API] Load projects failure',
  props<{ message: ErrorMessage }>()
)

export const createProject = createAction(
  '[Create Project Modal] Create project',
  props<{ project: Project }>()
)

export const createProjectSuccess = createAction(
  '[Project API] Create project success',
  props<{ project: Project }>()
)

export const createProjectFailure = createAction(
  '[Project API] Create project failure',
  props<{ message: ErrorMessage }>()
)

export const updateProject = createAction(
  '[Update Project Modal] Update project',
  props<{ project: Update<Project> }>()
)

export const updateProjectSuccess = createAction(
  '[Project API] Update project success',
  props<{ project: Project }>()
)

export const updateProjectFailure = createAction(
  '[Project API] Update project failure',
  props<{ message: ErrorMessage }>()
)

export const selectProject = createAction(
  '[Project Page] Load project selected',
  props<{ id: number }>()
)

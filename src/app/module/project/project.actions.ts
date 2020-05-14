import {createAction, props} from "@ngrx/store";
import {Project} from "../../../shared/model/project";
import {ErrorMessage} from "../../../shared/model/error-message";
import {Update} from "@ngrx/entity";

const loadProjects = createAction(
  '[Project Page] Load projects',
  props<{ userId: number }>()
)

const loadProjectsSuccess = createAction(
  '[Project API] Load projects success',
  props<{ projects: Project[] }>()
)

const loadProjectFailure = createAction(
  '[Project API] Load projects failure',
  props<{ message: ErrorMessage }>()
)

const createProject = createAction(
  '[Create Project Modal] Create project',
  props<{ project: Update<Project> }>()
)

const createProjectSuccess = createAction(
  '[Project API] Create project success',
  props<{ message: ErrorMessage }>()
)

const createProjectFailure = createAction(
  '[Project API] Create project failure',
  props<{ message: ErrorMessage }>()
)

const updateProject = createAction(
  '[Update Project Modal] Update project',
  props<{ project: Update<Project> }>()
)

const updateProjectSuccess = createAction(
  '[Project API] Update project success',
  props<{ message: ErrorMessage }>()
)

const updateProjectFailure = createAction(
  '[Project API] Update project failure',
  props<{ message: ErrorMessage }>()
)

export const ProjectActions = {
  createProject,
  createProjectFailure,
  createProjectSuccess,
  loadProjectFailure,
  loadProjects,
  loadProjectsSuccess,
  updateProject,
  updateProjectFailure,
  updateProjectSuccess
}

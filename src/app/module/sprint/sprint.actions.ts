import {createAction, props} from "@ngrx/store";
import {Sprint} from "../../../shared/model/sprint";
import {ErrorMessage} from "../../../shared/model/error-message";
import {Issue} from "../../../shared/model/issue";
import {Update} from "@ngrx/entity";

export const loadSprints = createAction(
  '[Sprint Page] Load Sprints',
  props<{ projectId: string }>()
)

export const loadSprintsSuccess = createAction(
  '[Sprint API] Load Sprints success',
  props<{ sprints: Sprint[] }>()
)

export const loadSprintFailure = createAction(
  '[Sprint API] Load Sprints failure',
  props<{ message: ErrorMessage }>()
)

export const addIssueToSprint = createAction(
  '[Sprint API] Add issue to sprint',
  props<{ issue: Update<Issue>}>()
)

export const addIssueToSprintSuccess = createAction(
  '[Sprint API] Add issue to sprint success',
)

export const  addIssueToSprintFailure = createAction(
  '[Sprint API] Add issue to sprint failure',
  props<{ message: ErrorMessage }>()
)

export const selectProject = createAction(
  '[Sprint Page] Select project',
  props<{ id: number }>()
)


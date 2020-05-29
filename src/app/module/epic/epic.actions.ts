import {createAction, props} from "@ngrx/store";
import {Epic} from "../../../shared/model/epic";
import {ErrorMessage} from "../../../shared/model/error-message";
import {Issue} from "../../../shared/model/issue";

export const loadEpics = createAction(
  '[Epic Page] Load Epics',
  props<{ projectId: string }>()
)

export const loadEpicsSuccess = createAction(
  '[Epic API] Load Epics success',
  props<{ epics: Epic[] }>()
)

export const loadEpicFailure = createAction(
  '[Epic API] Load Epics failure',
  props<{ message: ErrorMessage }>()
)

export const selectEpic = createAction(
  '[Epic Page] Select epic',
  props<{ id: number }>()
)

export const selectProject = createAction(
  '[Epic Page] Select project',
  props<{ id: number }>()
)

export const createEpic = createAction(
  '[Epic Page] Create epic',
  props<{ epic: Epic }>()
)

export const createEpicSuccess = createAction(
  '[Epic Page] Create epic success',
  props<{ epic: Epic }>()
)

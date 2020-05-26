import {createAction, props} from "@ngrx/store";
import {Epic} from "../../../shared/model/epic";
import {ErrorMessage} from "../../../shared/model/error-message";

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
  '[Epic Page] Load epic selected',
  props<{ id: number }>()
)

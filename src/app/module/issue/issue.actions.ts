import {createAction, props} from '@ngrx/store';
import {Issue} from "../../../shared/model/issue";
import {ErrorMessage} from "../../../shared/model/error-message";

export const loadIssues = createAction(
  '[Issue Page] Load Issues',
  props<{}>()
);

export const loadIssuesSuccess = createAction(
  '[Issue API] Load Issues Success',
  props<{ issues: Issue[] }>()
);

export const loadIssuesFailure = createAction(
  '[Issue API] Load Issues Failure',
  props<{ error: ErrorMessage }>()
);
